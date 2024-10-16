import React from "react";
import { signIn } from "next-auth/react";
import { GoogleButton } from "../styles/LoginButtonStyle";
import Image from "next/image";

const GoogleLoginButton = () => {
  return (
    <GoogleButton
      onClick={() => signIn("google")}
      aria-label="Mit Google anmelden"
    >
      <Image
        src="/icons/google-logo.svg"
        alt="Google Logo"
        width={24}
        height={24}
      />
      <span>Continue with Google</span> {/* Der Text wird zentriert */}
    </GoogleButton>
  );
};

export default GoogleLoginButton;
