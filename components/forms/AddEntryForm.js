import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import {
  Form,
  PlaceholderContainer,
  PlaceholderText,
  HiddenInput,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  ErrorMessage,
} from "../styles/AddEntryFormStyle";
import { PrimaryButton } from "../styles/PrimaryButtonStyle";
import { SelectButton, IconImage } from "../styles/SelectButtonStyle";
import Image from "next/image";

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
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
import "leaflet/dist/leaflet.css";

// Custom Icon für den Marker, benötigt die Leaflet-Bibliothek im Browser
let customIcon;
if (typeof window !== "undefined") {
  const L = require("leaflet");
  customIcon = new L.Icon({
    iconUrl: "/icons/mushroom-pin-icon.svg",
    iconSize: [25, 25],
    iconAnchor: [12, 41],
  });
}

export default function AddEntryForm({ onMutate }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { edit } = router.query;

  // Zustand für Formularfelder und Ladezustände
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [name, setName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState(""); // Optional
  const [scientificName, setScientificName] = useState("");
  const [group, setGroup] = useState("");
  const [edibility, setEdibility] = useState("");
  const [notes, setNotes] = useState(""); // Optional
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [entryData, setEntryData] = useState(null);

  // Cloudinary Upload-Konfiguration (aus Umgebungsvariablen)
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // Optionen für Pilzgruppen und Verzehrbarkeit mit zugehörigen Icons
  const groupOptions = [
    {
      value: "Röhrenpilze",
      label: "Röhrenpilze",
      icon: "/icons/boletes-icon.svg",
    },
    {
      value: "Lamellenpilze, Stiel mit Ring",
      label: "Lamellenpilze, Stiel mit Ring",
      icon: "/icons/lamellar-annulus-icon.svg",
    },
    {
      value: "Lamellenpilze, Stiel ohne Ring",
      label: "Lamellenpilze, Stiel ohne Ring",
      icon: "/icons/lamellar-icon.svg",
    },
    {
      value: "Sonstige Pilze",
      label: "Sonstige Pilze",
      icon: "/icons/other-mushrooms-icon.svg",
    },
  ];

  const edibilityOptions = [
    {
      value: "tödlich giftig",
      label: "tödlich giftig",
      icon: "/icons/deadly-toxic-icon.svg",
    },
    { value: "giftig", label: "giftig", icon: "/icons/toxic-icon.svg" },
    {
      value: "ungenießbar",
      label: "ungenießbar",
      icon: "/icons/inedible-icon.svg",
    },
    {
      value: "eingeschränkt essbar",
      label: "eingeschränkt essbar",
      icon: "/icons/edible-limited-icon.svg",
    },
    { value: "essbar", label: "essbar", icon: "/icons/edible-icon.svg" },
  ];

  // Geolocation-Abruf beim Laden der Komponente (User Location)
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Fehler beim Abrufen der Standortdaten:", error);
        }
      );
    }
  }, []);

  // Funktion zum Abrufen der Adresse anhand der Geokoordinaten
  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setAddress(data.display_name);
    } catch (error) {
      console.error("Fehler beim Abrufen der Adresse:", error);
    }
  };

  // Aktualisiere Adresse, sobald eine neue Position gesetzt wird
  useEffect(() => {
    if (location) {
      fetchAddress(location.latitude, location.longitude);
    }
  }, [location]);

  // Eventhandler für das Klicken auf die Karte (setzt neue Koordinaten)
  const handleMapClick = (e) => {
    setLocation({
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    });
    fetchAddress(e.latlng.lat, e.latlng.lng);
  };

  // Validierung der Benutzereingaben im Formular
  const validateInputs = () => {
    const validationErrors = {};
    if (!name.trim())
      validationErrors.name = "Bitte gib einen vermuteten Namen ein.";
    if (!scientificName.trim())
      validationErrors.scientificName =
        "Bitte gib einen wissenschaftlichen Namen ein.";
    if (!group) validationErrors.group = "Bitte wähle eine Gruppe aus.";
    if (!edibility)
      validationErrors.edibility = "Bitte wähle die Verzehrbarkeit aus.";
    if (!image) validationErrors.image = "Bitte lade ein Bild hoch.";
    return validationErrors;
  };

  // Eventhandler für das Hochladen von Bildern
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
    ];

    if (!allowedFormats.includes(file.type)) {
      setErrors({
        image:
          "Ungültiges Dateiformat. Bitte lade ein Bild im Format JPG, PNG, WEBP, HEIC oder HEIF hoch.",
      });
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (edit) {
      fetch(`/api/entries/${edit}`)
        .then((res) => res.json())
        .then((data) => {
          setEntryData(data);
          // Fülle die Formularfelder mit den geladenen Daten
          setName(data.name);
          setScientificName(data.scientificName);
          setGroup(data.group);
          setEdibility(data.edibility);
          setNotes(data.notes);
          setImage(data.image);
          setLocation(data.location);
          setAddress(data.address);
        });
    }
  }, [edit]);

  // Eventhandler für das Absenden des Formulars
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Überprüfung, ob der Benutzer eingeloggt ist
    if (status !== "authenticated") {
      setErrorMessage("Bitte logge dich ein, um einen Eintrag hinzuzufügen.");
      return;
    }

    // Validierung der Benutzereingaben
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setErrorMessage("Bitte fülle alle erforderlichen Felder aus.");
      return;
    }
    setErrorMessage("");
    setErrors({});

    setIsLoading(true);

    try {
      let imageUrl = image;

      // Wenn ein neues Bild hochgeladen wurde
      if (image && typeof image !== "string") {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", UPLOAD_PRESET);

        const imageResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const imageData = await imageResponse.json();

        if (!imageResponse.ok || !imageData.secure_url) {
          throw new Error("Fehler beim Hochladen des Bildes.");
        }
        imageUrl = imageData.secure_url;
      }

      // Eintrag-Daten
      const entryData = {
        name,
        alternativeNames,
        scientificName,
        group,
        edibility,
        notes,
        image: imageUrl,
        date: new Date().toISOString(),
        location,
        address,
        userId: session.user.id,
      };

      let res;
      if (edit) {
        // PUT-Anfrage zum Bearbeiten des Eintrags
        res = await fetch(`/api/entries/${edit}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(entryData),
        });

        if (res.ok) {
          alert("Eintrag erfolgreich aktualisiert!");
          onMutate("/api/entries"); // Einträge neu validieren
          router.push("/profile");
        } else {
          throw new Error("Fehler beim Aktualisieren des Eintrags.");
        }
      } else {
        // POST-Anfrage zum Erstellen eines neuen Eintrags
        res = await fetch("/api/entries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(entryData),
        });

        if (res.ok) {
          alert("Eintrag erfolgreich hinzugefügt!");
          onMutate("/api/entries"); // Einträge neu validieren
          router.push("/profile");
        } else {
          throw new Error("Fehler beim Hinzufügen des Eintrags.");
        }
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Bildvorschau oder Platzhalter */}
      {imagePreview ? (
        <div
          style={{ width: "100%", paddingTop: "100%", position: "relative" }}
        >
          <Image
            src={imagePreview}
            alt="Vorschau des hochgeladenen Bildes"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : (
        <PlaceholderContainer
          style={{
            width: "100%",
            paddingTop: "100%", // 1:1 Seitenverhältnis für quadratischen Platzhalter
            position: "relative",
          }}
        >
          <PlaceholderText>
            Hier wird das hochgeladene Bild angezeigt.
          </PlaceholderText>
        </PlaceholderContainer>
      )}

      {/* Formularfelder */}
      <PrimaryButton as="label" htmlFor="image-upload">
        Bild auswählen
        <HiddenInput
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </PrimaryButton>

      {isSubmitted && errors.image && (
        <ErrorMessage>{errors.image}</ErrorMessage>
      )}

      <Label htmlFor="name">Vermuteter Name des Pilzes</Label>
      <Input
        id="name"
        type="text"
        placeholder="Hier eingeben"
        value={name}
        onChange={(e) => setName(e.target.value)}
        $isError={!!errors.name && isSubmitted}
      />
      {isSubmitted && errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

      <Label htmlFor="alternativeNames">Alternative Namen</Label>
      <Input
        id="alternativeNames"
        type="text"
        placeholder="Hier eingeben"
        value={alternativeNames}
        onChange={(e) => setAlternativeNames(e.target.value)}
      />

      <Label htmlFor="scientificName">Wissenschaftlicher Name</Label>
      <Input
        id="scientificName"
        type="text"
        placeholder="Hier eingeben"
        value={scientificName}
        onChange={(e) => setScientificName(e.target.value)}
        $isError={!!errors.scientificName && isSubmitted}
      />
      {isSubmitted && errors.scientificName && (
        <ErrorMessage>{errors.scientificName}</ErrorMessage>
      )}

      <Label htmlFor="group">Gruppe</Label>
      <ButtonGroup>
        {groupOptions.map((option) => (
          <SelectButton
            key={option.value}
            $isSelected={group === option.value}
            onClick={(e) => {
              e.preventDefault();
              setGroup(option.value);
            }}
          >
            <IconImage
              src={option.icon}
              alt={option.label}
              width={24}
              height={24}
            />
            {option.label}
          </SelectButton>
        ))}
      </ButtonGroup>
      {isSubmitted && errors.group && (
        <ErrorMessage>{errors.group}</ErrorMessage>
      )}

      <Label htmlFor="edibility">Verzehrbarkeit</Label>
      <ButtonGroup>
        {edibilityOptions.map((option) => (
          <SelectButton
            key={option.value}
            $isSelected={edibility === option.value}
            onClick={(e) => {
              e.preventDefault();
              setEdibility(option.value);
            }}
          >
            <IconImage
              src={option.icon}
              alt={option.label}
              width={24}
              height={24}
            />
            {option.label}
          </SelectButton>
        ))}
      </ButtonGroup>
      {isSubmitted && errors.edibility && (
        <ErrorMessage>{errors.edibility}</ErrorMessage>
      )}

      <Label htmlFor="notes">Zusätzliche Notizen</Label>
      <TextArea
        id="notes"
        placeholder="Hier eingeben"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <Label htmlFor="location">Adresse</Label>
      <Input
        id="location"
        type="text"
        value={address || "Adresse wird geladen..."}
        readOnly
      />

      {/* Karte zur Auswahl der Position */}
      {location && typeof window !== "undefined" && (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={13}
          style={{ height: "300px", width: "100%" }}
          whenCreated={(map) => map.on("click", handleMapClick)}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[location.latitude, location.longitude]}
            icon={customIcon}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const latlng = e.target.getLatLng();
                setLocation({ latitude: latlng.lat, longitude: latlng.lng });
                fetchAddress(latlng.lat, latlng.lng);
              },
            }}
          >
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      )}

      {/* Submit-Button */}
      <PrimaryButton type="submit" disabled={isLoading}>
        {isLoading ? "Wird hochgeladen..." : "Eintrag hinzufügen"}
      </PrimaryButton>
    </Form>
  );
}
