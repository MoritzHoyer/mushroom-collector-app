import React from "react";
import MushroomInfoCard from "@/components/identify/MushroomCard";
import { Container } from "@/styles";
import SymbolExplanation from "@/components/identify/SymbolExplanation";

// Definiere den Array mit Pilzgruppen
const mushroomGroups = [
  {
    title: "Boletes",
    description:
      "Here you will find mushrooms with stalks and tubes such as porcini mushrooms, chestnut boletus, birch mushrooms and goat's lips.",
    image:
      "https://res.cloudinary.com/dztajqeaa/image/upload/v1729011794/user_uploads/by4aexfvdpkmnmdzm9fz.jpg",
    color: "#FFC9EC",
    icon: "/icons/boletes-icon.svg",
  },
  {
    title: "Lamellar Annulus",
    description:
      "Here you'll find mushrooms with ringed stems and plates such as button mushrooms, fly agarics, button mushrooms and parasols.",
    image:
      "https://res.cloudinary.com/dztajqeaa/image/upload/v1729011787/user_uploads/ubrv97amc0kinruxxino.jpg",
    color: "#F3A01E",
    icon: "/icons/lamellar-annulus-icon.svg",
  },
  {
    title: "Lamellar",
    description:
      "Here you will find mushrooms with unringed stems and lamellae, such as the lycopodium, russula, oyster mushroom or wrinkled tintling.",
    image:
      "https://res.cloudinary.com/dztajqeaa/image/upload/v1729011778/user_uploads/avrwlvxpik3w5ryleshk.jpg",
    color: "#89A92B",
    icon: "/icons/lamellar-icon.svg",
  },
  {
    title: "Other Mushrooms",
    description:
      "Here you will find mushrooms with other shapes such as tinder fungus, potato bovist, chanterelle, red gall fungus, or Judas Ear.",
    image:
      "https://res.cloudinary.com/dztajqeaa/image/upload/v1729011366/user_uploads/nw8nccvn6kdqn6ttba3f.jpg",
    color: "#7BAFD9",
    icon: "/icons/other-mushrooms-icon.svg",
  },
];

// Hauptkomponente für die IdentifyPage
const IdentifyPage = () => {
  return (
    <Container>
      <h1>
        This is how you determine the color code. The mushrooms are divided into
        four color groups.
      </h1>
      {mushroomGroups.map((group, index) => (
        <MushroomInfoCard
          key={index}
          title={group.title}
          description={group.description}
          imageUrl={group.image}
          color={group.color}
          icon={group.icon}
        />
      ))}
      <SymbolExplanation />
    </Container>
  );
};

export default IdentifyPage;
