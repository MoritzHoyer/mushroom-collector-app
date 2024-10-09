import React from "react";
import Header from "../components/layout/Header.js";
import Footer from "@/components/layout/Footer.js";
import LoginButton from "@/components/buttons/Login-Button.js";

export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <h1>Mushroom Collection</h1>
        <LoginButton></LoginButton>
      </main>
      <Footer />
    </div>
  );
}
