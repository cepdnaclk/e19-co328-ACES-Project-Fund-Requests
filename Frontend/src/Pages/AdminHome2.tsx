//import { SetStateAction, useState } from "react";
import FooterSection from "../components/FooterSection";
import Header from "../components/Header";
import NextButtonAdmin from "./NextButtonAdmin";
import { Link } from "react-router-dom";

import {
  Text,
  Grid,
  GridItem,
  // Textarea,
  Box,
  //Stack,
} from "@chakra-ui/react";

// const inputBorderColor = "#97bfd4";
const gridBackgrougndColor = "#F5F5F5";
// const inputFieldTextColor = "black";
const labelColor = "black";

const AdminHome2 = () => {
  // const [currentStep, setCurrentStep] = useState(1);
  // const handleStepperChange = (step: SetStateAction<number>) => {
  //   setCurrentStep(step);
  // };
  return (
    <>
      <Header></Header>
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

      <Box pb={"107px"}>
        <form className="AdminUiTexts">
          {/* Applicants */}
          <Grid
            paddingX={{ base: "20px", md: "10%" }}
            paddingY={{ base: "10px", md: "1%" }}
            templateAreas={{
              base: `"title"
                "answer"`,
              md: `"title answer"`,
            }}
            gridTemplateColumns={{ md: "30% 70%" }}
            gap={4}
            marginBottom={5}
          >
            <GridItem area={"title"} colSpan={1}>
              <Text
                fontWeight="bold"
                marginTop={2}
                whiteSpace={"nowrap"}
                color={labelColor}
              >
                Applicants
              </Text>
            </GridItem>
            <GridItem
              area={"answer"}
              bg={gridBackgrougndColor}
              borderRadius={7}
              colSpan={1}
              paddingX={{ base: "20px", md: "5%" }}
              paddingY={{ base: "10px", md: "2%" }}
            >
              <Text color={labelColor}>
                <ol>
                  <li>Jaliya</li>
                  <li>Another</li>
                </ol>
              </Text>
            </GridItem>
          </Grid>

          {/* Head's Name */}
          <Grid
            paddingX={{ base: "20px", md: "10%" }}
            paddingY={{ base: "10px", md: "1%" }}
            templateAreas={{
              base: `"title"
              "answer"`,
              md: `"title answer"`,
            }}
            gridTemplateColumns={{ md: "30% 70%" }}
            gap={4}
            marginBottom={5}
          >
            <GridItem area={"title"} colSpan={1}>
              <Text
                fontWeight="bold"
                marginTop={2}
                whiteSpace={"nowrap"}
                color={labelColor}
              >
                Leader's Name
              </Text>
            </GridItem>
            <GridItem
              area={"answer"}
              bg={gridBackgrougndColor}
              borderRadius={7}
              colSpan={1}
              paddingX={{ base: "20px", md: "5%" }}
              paddingY={{ base: "10px", md: "2%" }}
            >
              <Text color={labelColor}>Jaliya</Text>
            </GridItem>
          </Grid>

          {/* Email */}
          <Grid
            paddingX={{ base: "20px", md: "10%" }}
            paddingY={{ base: "10px", md: "1%" }}
            templateAreas={{
              base: `"title"
              "answer"`,
              md: `"title answer"`,
            }}
            gridTemplateColumns={{ md: "30% 70%" }}
            gap={4}
            marginBottom={5}
          >
            <GridItem area={"title"} colSpan={1}>
              <Text
                fontWeight="bold"
                marginTop={2}
                whiteSpace={"nowrap"}
                color={labelColor}
              >
                Email
              </Text>
            </GridItem>
            <GridItem
              area={"answer"}
              bg={gridBackgrougndColor}
              borderRadius={7}
              colSpan={1}
              paddingX={{ base: "20px", md: "5%" }}
              paddingY={{ base: "10px", md: "2%" }}
            >
              <Text color={labelColor}>e19210@eng.pdn.ac.lk</Text>
            </GridItem>
          </Grid>

          {/* Contact */}
          <Grid
            paddingX={{ base: "20px", md: "10%" }}
            paddingY={{ base: "10px", md: "1%" }}
            templateAreas={{
              base: `"title"
              "answer"`,
              md: `"title answer"`,
            }}
            gridTemplateColumns={{ md: "30% 70%" }}
            gap={4}
            marginBottom={5}
          >
            <GridItem area={"title"} colSpan={1}>
              <Text
                fontWeight="bold"
                marginTop={2}
                whiteSpace={"nowrap"}
                color={labelColor}
              >
                Contact
              </Text>
            </GridItem>
            <GridItem
              area={"answer"}
              bg={gridBackgrougndColor}
              borderRadius={7}
              colSpan={1}
              paddingX={{ base: "20px", md: "5%" }}
              paddingY={{ base: "10px", md: "2%" }}
            >
              <Text color={labelColor}>0773434343</Text>
            </GridItem>
          </Grid>

          {/* Next Button */}
          <Grid
            paddingX={{ base: "20px", md: "10%" }}
            paddingY={{ base: "10px", md: "1%" }}
          >
            <Link to="/admin3">
              <NextButtonAdmin
                currrentStep={0}
                onStepperChange={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Link>
          </Grid>
        </form>
      </Box>
      <Box width={"100%"} position={"fixed"} bottom={0}>
        <FooterSection />
      </Box>
    </>
  );
};

export default AdminHome2;
