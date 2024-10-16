import HomeCard from "@/components/homepage/HomeCard";
import { Container, colors } from "@/styles";

const mushroomGroups = [
  {
    title: "Boletes",
    description:
      "Here you will find mushrooms with stalks and tubes such as porcini mushrooms, chestnut boletus, birch mushrooms and goat's lips.",
    image:
      "https://res.cloudinary.com/your_cloud_name/image/upload/v12345/boletes.jpg",
    color: colors.boletes,
    icon: "/icons/boletes-icon.svg",
  },
  {
    title: "Lamellar Annulus",
    description:
      "Here you'll find mushrooms with ringed stems and plates such as button mushrooms, fly agarics, button mushrooms and parasols.",
    image:
      "https://res.cloudinary.com/your_cloud_name/image/upload/v12345/lamellar-annulus.jpg",
    color: colors.lamellaAnnulus,
    icon: "/icons/lamellar-annulus-icon.svg",
  },
  {
    title: "Lamellar",
    description:
      "Here you will find mushrooms with unringed stems and lamellae, such as the lycopodium, russula, oyster mushroom or wrinkled tintling.",
    image:
      "https://res.cloudinary.com/your_cloud_name/image/upload/v12345/lamellar.jpg",
    color: colors.lamella,
    icon: "/icons/lamellar-icon.svg",
  },
  {
    title: "Other Mushrooms",
    description:
      "Here you will find mushrooms with other shapes such as tinder fungus, potato bovist, chanterelle, red gall fungus, or Judas Ear.",
    image:
      "https://res.cloudinary.com/your_cloud_name/image/upload/v12345/other-mushrooms.jpg",
    color: colors.otherMushrooms,
    icon: "/icons/other-mushrooms-icon.svg",
  },
];

export default function HomePage() {
  return (
    <Container>
      <h1>Hey Moritz!</h1>
      <p>
        This is how you determine the color code. The mushrooms are divided into
        four color groups.
      </p>
      {mushroomGroups.map((group, index) => (
        <HomeCard key={index} group={group} />
      ))}
    </Container>
  );
}
