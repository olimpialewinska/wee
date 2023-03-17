import { MongoClient } from "mongodb";
import { hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import crypto from 'crypto';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const { email, password } = req.body;
    //Validate
    if (!email || !email.includes("@") || !password) {
      res.status(422).json({ message: "Invalid Data" });
      return;
    }
    //Connect with database
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
      {}
    );
    const db = client.db();
    //Check existing
    const checkExisting = await db
      .collection("users")
      .findOne({ email: email });
    //Send error response if duplicate user is found
    if (checkExisting) {
      res.status(422).json({ message: "User already exists" });
      client.close();
      return;
    }
    //Generate random token
    const token = crypto.randomBytes(32).toString('hex');
    //Hash password
    const status = await db.collection("users").insertOne({
      email,
      password: await hash(password, 12),
      emailstatus: "",
        verify_token: token
    });

    //Send email
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Pigeon - Email Verification",
        text: "Please click on the link to verify your email address: http://localhost:3000/api/profile/confirm/" + token
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    //Send success response
    res.status(201).json({ message: "User created", ...status });
    //Close DB connection
    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}

export default handler;
