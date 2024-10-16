import Image from "next/image";
import { HeaderContainer } from "../styles/HeaderStyle";
import LogoutButton from "../buttons/LogoutButton";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession(); // Überwache den Zustand der Session

  if (!session) return "";

  return (
    <HeaderContainer>
      <Image
        src="/shroomie-logo_color_01.svg"
        alt="Shroomie Logo"
        width={200}
        height={60}
        priority
      />
      {session && <LogoutButton />}{" "}
      {/* Zeige den Logout-Button nur, wenn der Benutzer eingeloggt ist */}
    </HeaderContainer>
  );
};

export default Header;
