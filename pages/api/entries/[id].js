import connect from "@/db/connect";
import Entry from "@/db/models/Entry";

export default async function handler(req, res) {
  await connect();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const entry = await Entry.findById(id);

      if (!entry) {
        return res.status(404).json({ message: "Eintrag nicht gefunden" });
      }

      res.status(200).json(entry);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Serverfehler beim Abrufen des Eintrags" });
    }
  } else if (req.method === "PUT") {
    // Eintrag aktualisieren
    try {
      const updatedEntry = await Entry.findByIdAndUpdate(id, req.body, {
        new: true, // Gibt den aktualisierten Eintrag zurück
        runValidators: true, // Validiert die Daten vor dem Update
      });

      if (!updatedEntry) {
        return res.status(404).json({ message: "Eintrag nicht gefunden" });
      }

      res.status(200).json({
        message: "Eintrag erfolgreich aktualisiert",
        entry: updatedEntry,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Serverfehler beim Aktualisieren des Eintrags",
      });
    }
  } else if (req.method === "DELETE") {
    // Eintrag löschen
    try {
      const deletedEntry = await Entry.findByIdAndDelete(id);

      if (!deletedEntry) {
        return res.status(404).json({ message: "Eintrag nicht gefunden" });
      }

      res.status(200).json({ message: "Eintrag erfolgreich gelöscht" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Serverfehler beim Löschen des Eintrags",
      });
    }
  } else {
    // Wenn die Methode nicht unterstützt wird
    res.status(405).json({ message: "Methode nicht erlaubt" });
  }
}
