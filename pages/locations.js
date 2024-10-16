import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PrimaryButton } from "../components/styles/PrimaryButtonStyle";
import useSWR from "swr";
import styled from "styled-components";
import Image from "next/image";
// import { MapContainer, Marker, TileLayer, Popup, Circle } from "react-leaflet";

// Dynamische Imports für Leaflet-Komponenten (Client-seitiges Rendering)
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
const Circle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  {
    ssr: false,
  }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

import "leaflet/dist/leaflet.css";

let customIcon;
if (typeof window !== "undefined") {
  import("leaflet").then((L) => {
    customIcon = new L.Icon({
      iconUrl: "/icons/mushroom-pin-icon.svg",
      iconSize: [25, 25],
      iconAnchor: [12, 41],
    });
  });
}

// Styles for Map
const MapWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 140px);
  margin: 0;
  padding: 0;
  position: absolute;
  top: 70px; // Ensure it starts from the very top
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
          {/* <TileLayer url="https://tile.jawg.io/1ca2be1b-3c2c-4d66-bbf6-82bcad84a98a/{z}/{x}/{y}{r}.png?access-token=OCQMFeqjmuIUfZ9XUmVpkiFgeLCwveHnhg78w316UnrCDNpitbJ0Xus26IF0J4WW" /> */}

          {/* Benutzer-Position anzeigen mit einem Kreis */}
          <Circle
            center={[currentLocation.latitude, currentLocation.longitude]}
            radius={50} // Radius in Metern
            fillColor="blue"
            color="blue"
            fillOpacity={0.2}
          >
            <Popup>Deine Position</Popup>
          </Circle>

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
