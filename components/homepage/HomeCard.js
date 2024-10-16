import Image from "next/image";
import {
  CardContainer,
  CardHeader,
  CardBody,
  IconImage,
  Description,
} from "../styles/HomeCardStyle";

const HomeCard = ({ group }) => {
  return (
    <CardContainer style={{ backgroundColor: group.color }}>
      <CardHeader>
        <IconImage src={group.icon} alt={group.name} width={24} height={24} />
        <h3>{group.name}</h3>
      </CardHeader>
      <Image src={group.image} alt={group.name} width={300} height={200} />
      <CardBody>
        <Description>{group.description}</Description>
      </CardBody>
    </CardContainer>
  );
};

export default HomeCard;
