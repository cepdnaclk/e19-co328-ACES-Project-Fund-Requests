import React from "react";
import { Box, Link } from "@chakra-ui/react";

const ViewMoreButton: React.FC = () => {
  return (
    <Link
      href="/"
      as="button"
      height="24px"
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      //px='0px'
      fontSize="sm"
      // fontFamily="Poppins, sans-serif"
      fontWeight="normal"
      color="blue"
      // position="absolute"
      // bottom="2"
      // left="2"
      _hover={{ color: "grey" }}
      _active={{
        bg: "#dddfe2",
        transform: "scale(0.98)",
      }}
    >
      View More
    </Link>
  );
};

export default ViewMoreButton;
