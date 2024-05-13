import { Box, Heading, Text } from "@chakra-ui/react";

const Description = () => {
  return (
    <Box justifyContent={"center"} paddingTop={"60px"}>
      <Text
        lineHeight={"40.86px"}
        paddingBottom={"30px"}
        textAlign={"center"}
        fontSize={"30px"}
        fontWeight={"600"}
        color={"#00334E"}
      >
        ACES Project Fund
      </Text>
      <Box
        borderRadius={"15px"}
        paddingX={"5%"}
        paddingY={"3%"}
        marginX={{ base: "5%", md: "20%" }}
        backgroundColor={"#E6F0F6"}
      >
        <Text
          fontSize={{ base: "14px", md: "16px" }}
          lineHeight={{ base: "26px", md: "30px" }}
          fontWeight={"normal"}
        >
          The project fund is set up by ACES with the help of donations from
          ACES Alumni. It is managed by a committee appointed by ACES and the
          members are ACES executives and the Head of the Department.
        </Text>
      </Box>
      <Text
        paddingTop={"60px"}
        lineHeight={"40.86px"}
        paddingBottom={"30px"}
        textAlign={"center"}
        fontSize={"30px"}
        fontWeight={"600"}
        color={"#021F2F"}
      >
        Application Form
      </Text>
    </Box>
  );
};

export default Description;
