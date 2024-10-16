import Image from "next/image";
import GoogleLoginButton from "../components/buttons/GoogleLoginButton";
import GitHubLoginButton from "../components/buttons/GitHubLoginButton";

const Login = () => {
  return (
    <div
      style={{
        height: "100vh", // Festes Viewport, verhindert Scrollen
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        overflow: "hidden", // Verhindert Scrollen
        textAlign: "left",
        padding: "30px 15px", // Geringere Padding-Werte
      }}
    >
      <Image
        src="/shroomie-logo_color_01.svg"
        alt="Shroomie Logo"
        width={200}
        height={60}
        style={{ marginBottom: "5px" }} // Verkleinerter Abstand zum nächsten Element
        priority
      />
      <h1
        style={{
          fontSize: "42px",
          fontWeight: "bold",
          marginBottom: "5px", // Verkleinerter Abstand zur Illustration
        }}
      >
        Identify mushrooms and track your discoveries.
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%", // Zentriert die Illustration horizontal im Container
          marginBottom: "-15px", // Verkleinerter Abstand zu den Buttons
        }}
      >
        <Image
          src="/shroomie-illustration.svg"
          alt="Illustration"
          width={300}
          height={300}
        />
      </div>
      {/* Verkleinerter Abstand zwischen den Buttons */}
      <GoogleLoginButton />
      <GitHubLoginButton />
    </div>
  );
};

export default Login;
