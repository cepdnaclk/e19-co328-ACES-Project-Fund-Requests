import React from "react";
import {
  Link,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
//import ViewMoreButton from "./ViewMoreButton";
// import { Link } from "react-router-dom";
//import cardImage from "../assets/images/cardImage.webp"

interface CardComponentProps {
  cardImage: string;
  bgColor: string;
  title: string; // Add title prop
  description: string; // Add description prop
  requestDate: string; // Add requestDate prop
}

const CardComponent: React.FC<CardComponentProps> = ({
  cardImage,
  bgColor,
  title,
  description,
  requestDate,
}) => {
  return (
    <Card
      className="cards"
      maxW="lg"
      bg={bgColor}
      marginBottom={"5%"}
      _hover={{ boxShadow: "xl" }}
    >
      <CardBody>
        <Image
          src={cardImage}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{description}</Text>
          <Link mt={5} color="blue.600" href={"/admin1"}>
            {/* <ViewMoreButton /> */}
            View more
          </Link>
        </Stack>
      </CardBody>
      <CardFooter fontFamily="Poppins, sans-serif">
        <Text
          color="grey"
          position="absolute"
          bottom="2"
          right="2"
          fontSize="xs"
        >
          Request was made on {requestDate}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
