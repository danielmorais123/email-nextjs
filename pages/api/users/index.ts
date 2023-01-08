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
        .find({ email: req.body.email })
        .toArray();
      if (user.length === 0) {
        let notifications: Notification[] = [
          {
            _id: new ObjectId().toString(),
            type: "Welcome",
            description: `Welcome ${req.body?.email}`,
            createdAt: new Date(),
          },
        ];
        let emails: any = [];
        await db.collection("user").insertOne({
          displayName: req.body.displayName,
          photoProfile: req.body.photoProfile,
          email: req.body.email,
          emailConfirmed: req.body.emailConfirmed,
          createdAt: req.body.createdAt,
          provider: req.body.provider,
          notifications,
          emails,
        });

        const userDbToReturn = await db
          .collection("user")
          .find({ email: req.body.email })
          .toArray();
        return res.json({ inserted: true, user: userDbToReturn[0] });
      }
      return res.json({ inserted: false, user: user[0] });
    case "GET":
      const users = await db.collection("user").find({}).toArray();

      return res.json({ users });
    case "PUT":
    /*  var objectToUpdate: UpdateUserObject = {};

      if (req.body?.name) objectToUpdate.displayName = req.body.name;
      if (req.body?.fileName) objectToUpdate.photoUrl = req.body.fileName;

      await db.collection("user").updateOne(
        { uid: req.query.id },
        {
          $set: objectToUpdate,
        }
      );
      const userDbToReturn = await db
        .collection("user")
        .find({ uid: req.query.id })
        .toArray();

      return res.json({ user: userDbToReturn[0] });
    case "GET":
      const u = await db
        .collection("user")
        .find({ uid: req.query.id })
        .toArray();

      return res.json({ u });
    default:
      res.json({ err: `${req.method} not allowed` }); */
  }
}
