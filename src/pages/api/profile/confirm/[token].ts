
import { MongoClient } from "mongodb";
import { hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.query.token;
    //Connect with database
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
        {}
    );
    const db = client.db();
    //Check existing
    const checkExisting = await db
        .collection("users")
        .findOne({"verify_token": token});

    console.log(token)

    if(checkExisting){
        db.collection("users").updateOne(
            { "verify_token": token },
            { $set: { "emailstatus": "verified" } }
        );
        res.status(200).json({ message: "Email verified" });
    } else {
        res.status(422).json({ message: "Invalid token" });
    }
}