import Image from "next/image";
import { HeaderContainer } from "../styles/HeaderStyle";

const Header = () => {
  return (
    <HeaderContainer>
      <Image
        src="/shroomie-logo_color_01.svg"
        alt="Shroomie: Mushroom Collector App Logo"
        width={200}
        height={60}
      />
    </HeaderContainer>
  );
};

export default Header;
