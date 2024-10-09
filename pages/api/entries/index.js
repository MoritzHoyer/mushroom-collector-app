import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Nicht authentifiziert" });
    return;
  }

  if (req.method === "POST") {
    try {
      const entry = { ...req.body, userId: session.user.id };
      const result = await db.collection("entries").insertOne(entry);
      res
        .status(201)
        .json({ message: "Eintrag erstellt", entryId: result.insertedId });
    } catch (error) {
      console.error("Fehler beim Erstellen des Eintrags:", error);
      res.status(500).json({ message: "Interner Serverfehler" });
    }
  } else if (req.method === "GET") {
    try {
      const entries = await db
        .collection("entries")
        .find({ userId: session.user.id })
        .toArray();
      res.status(200).json(entries);
    } catch (error) {
      console.error("Fehler beim Abrufen der Einträge:", error);
      res.status(500).json({ message: "Interner Serverfehler" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ message: `Methode ${req.method} nicht erlaubt` });
  }
}
