import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../database/mongodb";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("nextjsmongo");
  switch (req.method) {
    case "POST":
      const user = await db
        .collection("user")
        .find({ uid: req.query.id })
        .toArray();
      if (user.length === 0) {
        await db.collection("user").insertOne({
          uid: req.body.uid,
          displayName: req.body.displayName,
          photoUrl: req.body.photoUrl,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          emailConfirmed: req.body.emailConfirmed,
          created_at: new Date(),
          provider: req.body.provider,
        });

        const userDbToReturn = await db
          .collection("user")
          .find({ uid: req.query.id })
          .toArray();

        let notifications: NotificationList[] = [
          {
            type: "Welcome",
            description: `Welcome ${req.body?.email}`,
            created_at: new Date(),
            userSender: null,
            userSenderId: null,
          },
        ];

        await db.collection("notification").insertOne({
          userId: userDbToReturn[0]._id.toString(),
          notifications,
        });
        await db.collection("friend").insertOne({
          userId: userDbToReturn[0]._id.toString(),
          friends: [],
        });
        let messages: Message[] = [];
        await db.collection("message").insertOne({
          user: {
            email: userDbToReturn[0].email,
            emailConfirmed: userDbToReturn[0].emailConfirmed,
            displayName: userDbToReturn[0].displayName,
            photoUrl: userDbToReturn[0].photoUrl,
            uid: userDbToReturn[0].uid,
            phoneNumber: userDbToReturn[0].phoneNumber,
            id: userDbToReturn[0]._id.toString(),
            provider: userDbToReturn[0].provider,
          },
          userId: userDbToReturn[0]._id.toString(),
          messages,
        });
        return res.json({ inserted: true, user: userDbToReturn[0] });
      }
      return res.json({ inserted: false, user: user[0] });
    case "GET":
      const userDb = await db
        .collection("user")
        .find({ uid: req.query.id })
        .toArray();

      return res.json({ user: userDb[0] });
    case "PUT":
      var objectToUpdate: UpdateUserObject = {};

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
      res.json({ err: `${req.method} not allowed` });
  }
}
