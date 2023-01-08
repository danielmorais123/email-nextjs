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
    case "GET":
      let email = req.query.id;
      const users = await db.collection("user").find({ email }).toArray();

      return res.json({ user: users[0] });
  }
}
