import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Slider from "react-slick";
import {
  Form,
  Instructions,
  PlaceholderContainer,
  PlaceholderText,
  SliderContainer,
  SliderImage,
  HiddenInput,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  ErrorMessage,
} from "../styles/AddEntryFormStyle";
import { PrimaryButton } from "../styles/PrimaryButtonStyle";
import { SelectButton, IconImage } from "../styles/SelectButtonStyle";

// Dynamische Imports für Leaflet-Komponenten
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

// Custom Icon für den Marker
let customIcon;
if (typeof window !== "undefined") {
  const L = require("leaflet");
  customIcon = new L.Icon({
    iconUrl: "/icons/mushroom-pin-icon.svg", // Pfad zu deinem benutzerdefinierten Icon im public/icons-Ordner
    iconSize: [25, 25], // Größe des Icons
    iconAnchor: [12, 41], // Positionierung des Icons
  });
}

export default function AddEntryForm() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Standort und Adresse werden erst gesetzt, wenn die Geolocation verfügbar ist
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [name, setName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [group, setGroup] = useState("");
  const [edibility, setEdibility] = useState("");
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Fehlerzustände initial leer
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Neue State-Variable für den Submit

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

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

  useEffect(() => {
    if (location) {
      fetchAddress(location.latitude, location.longitude);
    }
  }, [location]);

  const handleMapClick = (e) => {
    setLocation({
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    });
    fetchAddress(e.latlng.lat, e.latlng.lng);
  };

  const validateInputs = () => {
    const validationErrors = {};
    if (!name.trim())
      validationErrors.name = "Bitte gib einen vermuteten Namen ein.";
    if (!alternativeNames.trim())
      validationErrors.alternativeNames = "Bitte gib alternative Namen ein.";
    if (!scientificName.trim())
      validationErrors.scientificName =
        "Bitte gib einen wissenschaftlichen Namen ein.";
    if (!group) validationErrors.group = "Bitte wähle eine Gruppe aus.";
    if (!edibility)
      validationErrors.edibility = "Bitte wähle die Verzehrbarkeit aus.";
    if (images.length !== 3)
      validationErrors.images = "Bitte wähle genau drei Bilder aus.";
    return validationErrors;
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length !== 3) {
      e.target.value = null;
      return;
    }

    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
    ];
    for (let i = 0; i < files.length; i++) {
      if (!allowedFormats.includes(files[i].type)) {
        e.target.value = null;
        return;
      }
    }

    setImages(files);

    const previews = [];
    for (let i = 0; i < files.length; i++) {
      previews.push(URL.createObjectURL(files[i]));
    }
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Setze den Submit-Status
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Fehler werden nur beim Submit gesetzt
      setErrorMessage("Bitte fülle alle erforderlichen Felder aus.");
      return;
    }
    setErrorMessage("");
    setErrors({}); // Fehler werden zurückgesetzt, wenn alles ausgefüllt ist

    setIsLoading(true);

    try {
      const imageUrls = [];
      const progressArray = [0, 0, 0];
      setUploadProgress(progressArray);

      for (let i = 0; i < images.length; i++) {
        const formData = new FormData();
        formData.append("file", images[i]);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();

          if (response.ok && data.secure_url) {
            imageUrls.push(data.secure_url);
            progressArray[i] = 100;
            setUploadProgress([...progressArray]);
          } else {
            throw new Error("Fehler beim Hochladen der Bilder.");
          }
        } catch (error) {
          console.error("Fehler beim Hochladen des Bildes:", error);
          throw error;
        }
      }

      const entry = {
        name,
        alternativeNames,
        scientificName,
        group,
        edibility,
        notes,
        images: imageUrls,
        date: new Date().toISOString(),
        location,
        address,
      };

      const res = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });

      if (res.ok) {
        alert("Eintrag erfolgreich hinzugefügt!");
        router.push("/profile");
      } else {
        throw new Error("Fehler beim Hinzufügen des Eintrags.");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Form onSubmit={handleSubmit}>
      {imagePreviews.length > 0 ? (
        <SliderContainer>
          <Slider {...sliderSettings}>
            {imagePreviews.map((src, index) => (
              <div key={index}>
                <SliderImage src={src} alt={`Bild ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </SliderContainer>
      ) : (
        <PlaceholderContainer>
          <PlaceholderText>
            Hier werden deine hochgeladenen Bilder angezeigt.
          </PlaceholderText>
        </PlaceholderContainer>
      )}

      <Instructions>
        Bitte lade genau drei Bilder des Pilzes hoch: Eins von der Seite, von
        oben und von unten. Diese Perspektiven sind für die Identifikation
        notwendig.
      </Instructions>

      <PrimaryButton htmlFor="image-upload">
        Datei auswählen
        <HiddenInput
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </PrimaryButton>

      {isSubmitted && errors.images && (
        <ErrorMessage>Bilder sind erforderlich</ErrorMessage>
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
        $isError={!!errors.alternativeNames && isSubmitted}
      />
      {isSubmitted && errors.alternativeNames && (
        <ErrorMessage>{errors.alternativeNames}</ErrorMessage>
      )}

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
            onClick={() => setGroup(option.value)}
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
            onClick={() => setEdibility(option.value)}
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

      <PrimaryButton type="submit" disabled={isLoading}>
        {isLoading ? "Wird hochgeladen..." : "Eintrag hinzufügen"}
      </PrimaryButton>
    </Form>
  );
}
