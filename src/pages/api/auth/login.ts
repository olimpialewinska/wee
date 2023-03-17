import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcryptjs";
import { NextResponse } from 'next/server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

    if (checkExisting) {
      if (
        checkExisting.emailstatus === "verified" &&
        (await compare(password, checkExisting.password))
      ) {
        res.status(200).json({ message: "Login successful" });
      } else if (checkExisting.emailstatus === "") {
        res.status(422).json({ message: "Email not verified" });
      } else if (checkExisting.password !== password) {
        res.status(422).json({ message: "Password incorrect" });
      }
    }
  }
}
