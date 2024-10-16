import { LogoutButtonStyle } from "../styles/LogoutButtonStyle";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/login"); // Manuelle Weiterleitung nach dem Logout
    });
  };

  return <LogoutButtonStyle onClick={handleLogout}>Logout</LogoutButtonStyle>;
};

export default LogoutButton;
