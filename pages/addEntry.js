// pages/addEntry.js
import React from "react";
import AddEntryForm from "../components/forms/AddEntryForm";
import Footer from "../components/layout/Footer";

export default function AddEntryPage() {
  return (
    <>
      <main>
        <AddEntryForm />
      </main>
      <Footer />
    </>
  );
}
