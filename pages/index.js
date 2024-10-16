import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login"); // Weiterleitung zur Login-Seite nach 3 Sekunden
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      style={{
        height: "100vh", // Festes Viewport, verhindert Scrollen
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Verhindert Scrollen
      }}
    >
      <Image
        src="/shroomie-logo_color_01.svg"
        alt="Shroomie Logo"
        width={300}
        height={300}
        priority
      />
    </div>
  );
};

export default HomePage;
