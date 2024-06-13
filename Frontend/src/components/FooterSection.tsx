import { Box, Text } from "@chakra-ui/react";

const FooterSection = () => {
  return (
    <Box
      data-testid="footer-section"  // new addition
      textAlign={"center"}
      bgColor={"#051B26"}
      width={"100%"}
      height={"107px"}
    >
      <Text fontSize={"14px"} paddingTop={"30px"} color={"white"}>
        Department of Computer Engineering - University of Peradeniya
      </Text>
      <Text fontSize={"12px"} color={"#aaa5a58c"}>
        Last Build: 13/06/2024
      </Text>
    </Box>
  );
};

export default FooterSection;
