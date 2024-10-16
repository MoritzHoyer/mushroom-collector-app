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
import { IconImage } from "../styles/SelectButtonStyle";
import { SelectSpeciesButton } from "../styles/SpeciesButtonStyle"; // Neue Komponente
import { SelectEdibilityButton } from "../styles/EdibilityButtonStyle"; // Neue Komponente
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
      value: "boletes",
      label: "Boletes",
      icon: "/icons/boletes-icon.svg",
    },
    {
      value: "lamellaAnnulus",
      label: "Lamellar Annulus",
      icon: "/icons/lamellar-annulus-icon.svg",
    },
    {
      value: "lamella",
      label: "Lamellar",
      icon: "/icons/lamellar-icon.svg",
    },
    {
      value: "otherMushrooms",
      label: "Other Mushrooms",
      icon: "/icons/other-mushrooms-icon.svg",
    },
  ];

  const edibilityOptions = [
    {
      value: "deadly toxic",
      label: "deadly toxic",
      icon: "/icons/deadly-toxic-icon.svg",
    },
    { value: "toxic", label: "toxic", icon: "/icons/toxic-icon.svg" },
    {
      value: "inedible",
      label: "inedible",
      icon: "/icons/inedible-icon.svg",
    },
    {
      value: "edible limited",
      label: "edible limited",
      icon: "/icons/edible-limited-icon.svg",
    },
    { value: "edible", label: "edible", icon: "/icons/edible-icon.svg" },
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
          console.error("Error when retrieving location data:", error);
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
      console.error("Error when retrieving the address:", error);
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
    if (!name.trim()) validationErrors.name = "Please enter a suspected name.";
    if (!scientificName.trim())
      validationErrors.scientificName = "Please enter a scientific name.";
    if (!group) validationErrors.group = "Please select a species.";
    if (!edibility)
      validationErrors.edibility = "Bitte wähle die Verzehrbarkeit aus.";
    if (!image) validationErrors.image = "Please upload an image.";
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
          "Invalid file format. Please upload an image in JPG, PNG, WEBP, HEIC or HEIF format.",
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
      setErrorMessage("Please log in to add an entry.");
      return;
    }

    // Validierung der Benutzereingaben
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setErrorMessage("Please fill in all required fields.");
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
          throw new Error("Error uploading the image.");
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
          alert("Entry successfully updated!");
          onMutate("/api/entries"); // Einträge neu validieren
          router.push("/profile");
        } else {
          throw new Error("Error updating the entry.");
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
          alert("Entry successfully added!");
          onMutate("/api/entries"); // Einträge neu validieren
          router.push("/profile");
        } else {
          throw new Error("Error while adding the entry.");
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
            alt="Preview of the uploaded image"
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
            The uploaded image is displayed here.
          </PlaceholderText>
        </PlaceholderContainer>
      )}

      {/* Formularfelder */}
      <PrimaryButton as="label" htmlFor="image-upload">
        Select Image
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

      <Label htmlFor="name">Name of Mushroom</Label>
      <Input
        id="name"
        type="text"
        placeholder="Type here"
        value={name}
        onChange={(e) => setName(e.target.value)}
        $isError={!!errors.name && isSubmitted}
      />
      {isSubmitted && errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

      <Label htmlFor="alternativeNames">Alternative Names</Label>
      <Input
        id="alternativeNames"
        type="text"
        placeholder="Type here"
        value={alternativeNames}
        onChange={(e) => setAlternativeNames(e.target.value)}
      />

      <Label htmlFor="scientificName">Scientific Name</Label>
      <Input
        id="scientificName"
        type="text"
        placeholder="Type here"
        value={scientificName}
        onChange={(e) => setScientificName(e.target.value)}
        $isError={!!errors.scientificName && isSubmitted}
        style={{ marginBottom: "30px" }}
      />
      {isSubmitted && errors.scientificName && (
        <ErrorMessage>{errors.scientificName}</ErrorMessage>
      )}

      {/* Species Section */}
      <Label htmlFor="group">Species</Label>
      <ButtonGroup>
        {groupOptions.map((option) => (
          <SelectSpeciesButton
            key={option.value}
            speciesType={option.value}
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
          </SelectSpeciesButton>
        ))}
      </ButtonGroup>
      {isSubmitted && errors.group && (
        <ErrorMessage>{errors.group}</ErrorMessage>
      )}

      {/* Edibility Section */}
      <Label htmlFor="edibility">Edibility</Label>
      <ButtonGroup>
        {edibilityOptions.map((option) => (
          <SelectEdibilityButton
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
          </SelectEdibilityButton>
        ))}
      </ButtonGroup>
      {isSubmitted && errors.edibility && (
        <ErrorMessage>{errors.edibility}</ErrorMessage>
      )}

      <Label htmlFor="notes">Zusätzliche Notizen</Label>
      <TextArea
        id="notes"
        placeholder="Type here"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <Label htmlFor="location">Adresse</Label>
      <Input
        id="location"
        type="text"
        value={address || "Address is loading..."}
        readOnly
        style={{ marginBottom: "30px" }}
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
        {isLoading ? "Being uploaded..." : "Add entry"}
      </PrimaryButton>
    </Form>
  );
}
