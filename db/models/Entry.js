import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  alternativeNames: String,
  scientificName: { type: String, required: true },
  group: { type: String, required: true },
  edibility: { type: String, required: true },
  notes: String,
  image: String,
  date: { type: Date, default: Date.now },
  location: {
    latitude: Number,
    longitude: Number,
  },
});

export default mongoose.models.Entry || mongoose.model("Entry", EntrySchema);
