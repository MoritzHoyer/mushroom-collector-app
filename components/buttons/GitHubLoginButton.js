import React from "react";
import { signIn } from "next-auth/react";
import { GitHubButton } from "../styles/LoginButtonStyle";
import Image from "next/image";

const GitHubLoginButton = () => {
  return (
    <GitHubButton
      onClick={() => signIn("github")}
      aria-label="Mit GitHub anmelden"
    >
      <Image
        src="/icons/github-logo.svg"
        alt="GitHub Logo"
        width={24}
        height={24}
      />
      <span>Continue with GitHub</span> {/* Der Text wird zentriert */}
    </GitHubButton>
  );
};

export default GitHubLoginButton;
