//import FooterSection from "../components/FooterSection";
import React from "react";
import Header from "../components/Header";
import { Input, Button, FormControl, FormLabel, Flex } from "@chakra-ui/react";
// import React, { useState } from 'react';

import {
  Text,
  Grid,
  GridItem,
  //Textarea,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FooterSection from "../components/FooterSection";

//const inputBorderColor = "#97bfd4";
//const gridBackgrougndColor = "#F5F5F5";
// const inputFieldTextColor = "black";
//const labelColor = "black";

const AdminHome3 = () => {
  // const [showDateInput, setShowDateInput] = useState(false);
  // const [showTextInput, setShowTextInput] = useState(false);

  // const handleGoButtonClick = () => {
  //   // const inputElement = document.getElementById("decisionInput");
  //   // const inputValue = inputElement.value;
  //   const inputElement = document.getElementById("decisionInput") as HTMLInputElement;
  //   if (inputElement) {
  //     const inputValue = inputElement.value;
  //     if (inputValue === "yes") {
  //       setShowDateInput(true);
  //       setShowTextInput(false);
  //     } else if (inputValue === "no") {
  //       setShowDateInput(false);
  //       setShowTextInput(true);
  //     }
  //   }
  // };

  //2013.11.26 start

  const navigate = useNavigate();
  const [decisionInput, setDecisionInput] = React.useState("");

  const handleGoButtonClick = () => {
    const input = decisionInput.toLowerCase();

    if (input == "yes") {
      navigate("/yes");
    } else if (input == "no") {
      navigate("/no");
    } else {
      alert("Invalid Input !");
    }
  };
  //2013.11.26 end
  return (
    <Flex direction="column" minHeight="100vh">
      <Box as="header">
        <Header></Header>
      </Box>
      
      <Box
        paddingTop={"7%"}
        paddingBottom={"2%"}
        // marginX={"10px"}
        // boxShadow="base"
        paddingX={"10%"}
        display={"block"}
        className="AdminUiTexts"
      >
        <Text
          color={"#00334E"}
          fontSize={"20px"}
          fontWeight={"normal"}
          paddingBottom={"20px"}
        >
          Project “Secure Network Infrastructure Enhancement Project”
        </Text>
      </Box>

      <Box
        pb={"107px"}
        //bg={gridBackgrougndColor}
        paddingX={{ base: "15%", md: "20%" }}
        className="AdminUiTexts"
      >
        <Text fontWeight={"bold"}>
          Do you agree to provide financial support for the project mentioned
          above?
        </Text>

        <Grid
          // paddingX={{ base: "20px", md: "10%" }}
          // paddingY={{ base: "10px", md: "1%" }}

          templateAreas={{
            base: `"textitem"
              "input"
              "button1"`,
            md: `"textitem"
              "input button1"`,
          }}
          gridTemplateColumns={{ md: "50% 50%", lg: "50% 50%" }}
          gap={2}
          marginBottom={5}
        >
          <GridItem area={"textitem"}>
            <Text
              fontSize={"smaller"}
              margin={{ base: "5% 0% 0%", md: "3% 0% 0%" }}
              color={"#757070"}
            >
              Provide your decision by typing Yes / No
            </Text>
          </GridItem>
          <GridItem area={"input"}>
            <Input
              //id="decisionInput"
              margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
              width={{ base: "80%", md: "85%", lg: "90%" }}
              variant="outline"
              borderColor="black"
              placeholder="Yes / No"
              onChange={(e) => {
                setDecisionInput(e.target.value);
              }}
              value={decisionInput}
            />
          </GridItem>
          <GridItem area={"button1"}>
            <Button
              onClick={handleGoButtonClick}
              marginTop={"1%"}
              colorScheme="green"
              variant="outline"
              paddingX={"5%"}
              paddingY={"3%"}
              borderRadius={"20px"}
              size={"xs"}
            >
              GO
            </Button>
          </GridItem>
        </Grid>
        {/* {showDateInput && (
          <FormControl>
            <FormLabel>Date Input</FormLabel>
            <Input
              margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
              width={{ base: "80%", md: "85%", lg: "90%" }}
              variant="outline" 
              borderColor="black" 
              placeholder="Enter a date" 
            />
          </FormControl>
        )}

        {showTextInput && (
          <FormControl>
            <FormLabel>Text Input</FormLabel>
            <Input
              margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
              width={{ base: "80%", md: "85%", lg: "90%" }}
              variant="outline" 
              borderColor="black" 
              placeholder="Enter the reason" 
            />
          </FormControl>
        )} */}
      </Box>
      <Box width={"100%"} position={"fixed"} bottom={0}>
        <FooterSection />
      </Box>

      {/* Approval states */}
    </Flex>
  );
};
export default AdminHome3;
