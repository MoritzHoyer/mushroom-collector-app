import { getSession } from "next-auth/react";
import connect from "@/db/connect";
import Entry from "@/db/models/Entry";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Nicht authentifiziert" });
    return;
  }

  await connect();

  if (req.method === "POST") {
    try {
      const entryData = req.body;
      entryData.userId = session.user.id;

      const newEntry = new Entry(entryData);
      await newEntry.save();

      res.status(201).json({ message: "Eintrag erstellt", entry: newEntry });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Serverfehler beim Erstellen des Eintrags" });
    }
  } else if (req.method === "GET") {
    try {
      const entries = await Entry.find({ userId: session.user.id }).exec();
      res.status(200).json(entries);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Serverfehler beim Abrufen der Einträge" });
    }
  } else {
    res.status(405).json({ message: "Methode nicht erlaubt" });
  }
}
