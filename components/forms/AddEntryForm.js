// components/forms/AddEntryForm.js

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
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

// Importiere die CSS-Dateien für den Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AddEntryForm() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [group, setGroup] = useState(""); // Für die Pilzgruppe
  const [edibility, setEdibility] = useState(""); // Für die Verzehrbarkeit
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Umgebungsvariablen auslesen
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // Optionen für Gruppe und Verzehrbarkeit
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
    {
      value: "giftig",
      label: "giftig",
      icon: "/icons/toxic-icon.svg",
    },
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
    {
      value: "essbar",
      label: "essbar",
      icon: "/icons/edible-icon.svg",
    },
  ];

  // Ladezustand oder nicht authentifizierten Zustand behandeln
  if (status === "loading") {
    return <p>Lade Authentifizierungsstatus...</p>;
  }

  if (!session) {
    return <p>Bitte melde dich an, um einen Eintrag hinzuzufügen.</p>;
  }

  const validateInputs = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Bitte gib einen vermuteten Namen ein.";
    }
    if (!alternativeNames.trim()) {
      errors.alternativeNames = "Bitte gib alternative Namen ein.";
    }
    if (!scientificName.trim()) {
      errors.scientificName = "Bitte gib einen wissenschaftlichen Namen ein.";
    }
    if (!group) {
      errors.group = "Bitte wähle eine Gruppe aus.";
    }
    if (!edibility) {
      errors.edibility = "Bitte wähle die Verzehrbarkeit aus.";
    }
    if (images.length !== 3) {
      errors.images = "Bitte wähle genau drei Bilder aus.";
    }

    return errors;
  };

  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files.length !== 3) {
      setErrors({
        ...errors,
        images: "Bitte wähle genau drei Bilder aus.",
      });
      e.target.value = null; // Reset des Dateiauswahlfeldes
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
        setErrors({
          ...errors,
          images:
            "Bitte wähle Bilder im Format JPG, PNG, WEBP, HEIC oder HEIF aus.",
        });
        e.target.value = null;
        return;
      }
    }

    setImages(files);
    setErrors({ ...errors, images: null });

    // Vorschauen der Bilder erstellen
    const previews = [];
    for (let i = 0; i < files.length; i++) {
      previews.push(URL.createObjectURL(files[i]));
    }
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Stelle sicher, dass der Browser Geolocation unterstützt
    if (!navigator.geolocation) {
      alert("Geolocation wird von deinem Browser nicht unterstützt.");
      return;
    }

    setIsLoading(true); // Ladeindikator anzeigen

    try {
      // Standortdaten abrufen
      let location = null;
      location = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Fehler beim Abrufen der Standortdaten:", error);
            resolve(null); // Weiter ohne Standortdaten
          }
        );
      });

      // Bilder zu Cloudinary hochladen
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
            // Fortschritt aktualisieren
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

      // Erstelle den Eintrag
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
        // `userId` wird in der API-Route hinzugefügt
      };

      // Sende den Eintrag an die API
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });

      if (res.ok) {
        // Erfolgsmeldung und Weiterleitung zur Profilseite
        alert("Eintrag erfolgreich hinzugefügt!");
        router.push("/profile");
      } else {
        throw new Error("Fehler beim Hinzufügen des Eintrags.");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false); // Ladeindikator ausblenden
    }
  };

  // Einstellungen für den Slider
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
        Bitte lade genau <strong>drei Bilder</strong> des Pilzes hoch: von der{" "}
        <strong>Seite</strong>, von <strong>oben</strong> und von{" "}
        <strong>unten</strong>. Diese Perspektiven sind für die Identifikation
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
          required
        />
      </PrimaryButton>

      {errors.images && <ErrorMessage>{errors.images}</ErrorMessage>}

      <Label htmlFor="name">Vermuteter Name des Pilzes</Label>
      <Input
        id="name"
        type="text"
        placeholder="Hier eingeben"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

      <Label htmlFor="alternativeNames">Alternative Namen</Label>
      <Input
        id="alternativeNames"
        type="text"
        placeholder="Hier eingeben"
        value={alternativeNames}
        onChange={(e) => setAlternativeNames(e.target.value)}
        required
      />
      {errors.alternativeNames && (
        <ErrorMessage>{errors.alternativeNames}</ErrorMessage>
      )}

      <Label htmlFor="scientificName">Wissenschaftlicher Name</Label>
      <Input
        id="scientificName"
        type="text"
        placeholder="Hier eingeben"
        value={scientificName}
        onChange={(e) => setScientificName(e.target.value)}
        required
      />
      {errors.scientificName && (
        <ErrorMessage>{errors.scientificName}</ErrorMessage>
      )}

      <Label htmlFor="group">Gruppe</Label>
      <ButtonGroup>
        {groupOptions.map((option) => (
          <SelectButton
            key={option.value}
            $isSelected={group === option.value} // Highlight den gewählten Button für "Gruppe"
            onClick={() => setGroup(option.value)} // Setzt den ausgewählten Gruppenwert
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
      {errors.group && <ErrorMessage>{errors.group}</ErrorMessage>}

      <Label htmlFor="edibility">Verzehrbarkeit</Label>
      <ButtonGroup>
        {edibilityOptions.map((option) => (
          <SelectButton
            key={option.value}
            $isSelected={edibility === option.value} // Highlight den gewählten Button für "Verzehrbarkeit"
            onClick={() => setEdibility(option.value)} // Setzt den ausgewählten Verzehrbarkeitswert
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
      {errors.edibility && <ErrorMessage>{errors.edibility}</ErrorMessage>}

      <Label htmlFor="notes">Zusätzliche Notizen</Label>
      <TextArea
        id="notes"
        placeholder="Hier eingeben"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <PrimaryButton type="submit" disabled={isLoading}>
        {isLoading ? "Wird hochgeladen..." : "Eintrag hinzufügen"}
      </PrimaryButton>
      {isLoading && <p>Lade hoch, bitte warten...</p>}
    </Form>
  );
}
