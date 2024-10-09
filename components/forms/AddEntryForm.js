import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const allowedFormats = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

const AddEntryForm = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  console.log("CLOUD_NAME:", CLOUD_NAME);
  console.log("UPLOAD_PRESET:", UPLOAD_PRESET);

  const validateInputs = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Bitte gib einen vermuteten Namen ein.";
    }

    if (images.length !== 3) {
      errors.images = "Bitte wähle genau drei Bilder aus.";
    }

    return errors;
  };

  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files.length !== 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: "Bitte wähle genau drei Bilder aus.",
      }));
      e.target.value = null;
      return;
    }

    for (let i = 0; i < files.length; i++) {
      if (!allowedFormats.includes(files[i].type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          images:
            "Bitte wähle Bilder im Format JPG, PNG, WEBP, HEIC oder HEIF aus.",
        }));
        e.target.value = null;
        return;
      }
    }

    setImages(files);
    setErrors((prevErrors) => ({ ...prevErrors, images: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation wird von deinem Browser nicht unterstützt.");
      return;
    }

    setIsLoading(true);

    try {
      const location = await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error(
              "Fehler beim Abrufen der Standortdaten:",
              error.message
            );
            resolve(null);
          }
        );
      });

      // Bilder zu Cloudinary hochladen
      const imageUrls = [];

      for (let i = 0; i < images.length; i++) {
        const formData = new FormData();
        formData.append("file", images[i]);
        formData.append("upload_preset", UPLOAD_PRESET);

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
          // Fortschrittsanzeige aktualisieren
          setUploadProgress((prevProgress) => {
            const newProgress = [...prevProgress];
            newProgress[i] = 100;
            return newProgress;
          });
        } else {
          throw new Error("Fehler beim Hochladen der Bilder.");
        }
      }

      // Eintrag erstellen
      const entry = {
        name,
        notes,
        images: imageUrls,
        date: new Date().toISOString(),
        location,
        userId: session.user.id,
      };

      const res = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });

      if (res.ok) {
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

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Vermuteter Name des Pilzes"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      <TextArea
        placeholder="Zusätzliche Notizen"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        required
      />
      {errors.images && <ErrorMessage>{errors.images}</ErrorMessage>}
      {uploadProgress.length > 0 && (
        <ProgressContainer>
          {uploadProgress.map((progress, index) => (
            <ProgressBar key={index}>
              <Progress $progress={progress} />
            </ProgressBar>
          ))}
        </ProgressContainer>
      )}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Wird hochgeladen..." : "Eintrag hinzufügen"}
      </Button>
      {isLoading && <p>Lade hoch, bitte warten...</p>}
    </Form>
  );
};

export default AddEntryForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
`;

const TextArea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const ProgressBar = styled.div`
  background-color: #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 5px;
`;

const Progress = styled.div`
  background-color: #5a67d8;
  height: 10px;
  width: ${({ $progress }) => $progress}%;
  transition: width 0.3s ease;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`;
