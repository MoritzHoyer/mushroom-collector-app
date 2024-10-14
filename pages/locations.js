import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PrimaryButton } from "../components/styles/PrimaryButtonStyle";
import useSWR from "swr";
import styled from "styled-components";
import Image from "next/image";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

import "leaflet/dist/leaflet.css";

let customIcon;
if (typeof window !== "undefined") {
  const L = require("leaflet");
  customIcon = new L.Icon({
    iconUrl: "/icons/mushroom-pin-icon.svg",
    iconSize: [25, 25],
    iconAnchor: [12, 41],
  });
}

// Styles for Map
const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Locations() {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useState(null); // Für die Benutzerposition

  // useSWR Hook zum Abrufen der Benutzereinträge
  const { data: entries, error } = useSWR(
    session ? "/api/entries" : null,
    fetcher
  );

  useEffect(() => {
    // Abrufen des aktuellen Standorts des Benutzers
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Fehler beim Abrufen der Geolocation:", error);
        }
      );
    }
  }, []);

  if (!session) {
    return (
      <div>
        <p>Bitte einloggen, um die Locations anzuzeigen.</p>
        <PrimaryButton onClick={() => router.push("/auth/login")}>
          Login
        </PrimaryButton>
      </div>
    );
  }

  if (error) {
    return <div>Fehler beim Laden der Daten...</div>;
  }

  if (!entries || !currentLocation) {
    return <div>Lädt...</div>;
  }

  return (
    <MapWrapper>
      {entries && (
        <MapContainer
          center={[currentLocation.latitude, currentLocation.longitude]} // Verwende die aktuelle Benutzerlocation als Startpunkt
          zoom={13} // Zoomstufe, die du anpassen kannst
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {entries.map((entry) => (
            <Marker
              key={entry._id}
              position={[entry.location.latitude, entry.location.longitude]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <Image
                    src={entry.image}
                    alt={entry.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <p>{entry.name}</p>
                  <button onClick={() => router.push(`/entries/${entry._id}`)}>
                    Details ansehen
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </MapWrapper>
  );
}
