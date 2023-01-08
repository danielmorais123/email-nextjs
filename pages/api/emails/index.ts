import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../database/mongodb";
import { Email, Notification } from "../../../types/types";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("gmail");

  switch (req.method) {
    case "POST":
      const user = await db
        .collection("user")
        .find({ email: req.body.authUserEmail })
        .toArray();

      return res.json({});
    case "GET":
      const userDb = await db
        .collection("user")
        .find({ email: req.body.email })
        .toArray();

      return res.json({ user: userDb[0] });
    case "PUT":
      let emailsUpdated = {
        emails: {
          _id: new ObjectId(),
          fromUser: null,
          title: req.body.subject,
          type: "Inbox",
          emailContent: req.body.email,
          createdAt: new Date(),
        },
      };
      await db
        .collection("user")
        .updateOne({ email: req.body.authUserEmail }, { $push: emailsUpdated });

      let emailsSentUpdate = {
        emails: {
          _id: new ObjectId(),
          fromUser: req.body.authUser,
          title: req.body.subject,
          type: "Inbox",
          emailContent: req.body.email,
          createdAt: new Date(),
        },
      };

      await db
        .collection("user")
        .updateOne({ email: req.body.to }, { $push: emailsSentUpdate });

      return res.json({ success: true });
  }
}
