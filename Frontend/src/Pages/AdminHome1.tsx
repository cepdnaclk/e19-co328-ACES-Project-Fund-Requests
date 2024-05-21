import FooterSection from "../components/FooterSection";
import Header from "../components/Header";
//import NextButton from "../components/NextButton";
import NextButtonAdmin from "./NextButtonAdmin";
//import { SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Text,
  Grid,
  GridItem,
  Link,
  //Button,
  // Textarea,
  Box,
  //Stack,
} from "@chakra-ui/react";

// const inputBorderColor = "#97bfd4";
const gridBackgrougndColor = "#F5F5F5";
// const inputFieldTextColor = "black";
const labelColor = "black";

const AdminHome1 = () => {
  // const [currentStep, setCurrentStep] = useState(1);
  // const handleStepperChange = (step: SetStateAction<number>) => {
  //   setCurrentStep(step);
  // };

  const [data, setData] = useState(null);
  const { id } = useParams(); // Dynamically obtain the 'id' from the URL

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the backend
    axios
      .get(`/find/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

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
          Automated Inventory Management System Upgrade
        </Text>
      </Box>

      <Box pb={"107px"}>
        <form className="AdminUiTexts">
          {/* Project Type */}
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
                Project Type
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
              <Text color={labelColor}>Hobby</Text>
              {/* <Text marginTop={2} color={labelColor}>
              CO325
            </Text> */}
            </GridItem>
          </Grid>

          {/* Project Description */}
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
                Project Description
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
                The project aims to upgrade the existing manual inventory
                management system of a small retail business to an automated
                system. This upgrade is crucial for improving efficiency,
                accuracy, and overall management of inventory, which will lead
                to reduced operational costs and increased customer
                satisfaction.
              </Text>
            </GridItem>
          </Grid>

          {/* Project Goals and Roadmap */}
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
                Project Goals and Roadmap
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
                Efficiency Improvement: The primary goal is to increase
                operational efficiency. This will be achieved through the
                implementation of an automated system that reduces the time and
                effort required for inventory management. Data entry, tracking,
                and restocking processes will be streamlined. Accuracy
              </Text>
              <Text mt={5}>
                Enhancement: The new system will reduce human errors in data
                entry, leading to more accurate inventory counts. Barcode
                scanning and RFID technology will be used for real-time
                tracking, ensuring inventory accuracy.
              </Text>
            </GridItem>
          </Grid>

          {/* Project Risks and Reduction */}
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
                Project Risks and Reduction
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
                Data Loss or Corruption: To mitigate the risk of data loss or
                corruption during the migration process, regular backups will be
                maintained, and a robust data migration plan will be
                established.
              </Text>

              <Text mt={5}>
                Staff Resistance: Some employees may resist the change from
                manual to automated systems. To address this, a change
                management plan will be developed, including training,
                incentives, and communication.
              </Text>
            </GridItem>
          </Grid>

          {/* Starting Date */}
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
                Starting Date
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
              <Text color={labelColor}>2023-10-19</Text>
            </GridItem>
          </Grid>

          {/* Ending Date */}
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
                Ending Date
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
              <Text color={labelColor}>2023-10-26</Text>
            </GridItem>
          </Grid>

          {/* Budget Report */}
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
                Budegt Report
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
              <Link color={"blue.700"} href={"#"}>
                Budget repot.pdf
              </Link>
              {/* Don't know how to add the report and make it downloadable. */}
            </GridItem>
          </Grid>

          {/* Next Button */}
          <Grid
            paddingX={{ base: "20px", md: "10%" }}
            paddingY={{ base: "10px", md: "1%" }}
          >
            <Link href="/admin2">
              <NextButtonAdmin
                currrentStep={0}
                onStepperChange={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Link>
          </Grid>

          {/* <Link to="/admin2">
          <NextButtonAdmin currrentStep={0} onStepperChange={function (index: number): void {
            throw new Error("Function not implemented.");
          } } />
        </Link> */}
        </form>
      </Box>
      <Box width={"100%"} position={"fixed"} bottom={0}>
        <FooterSection />
      </Box>
    </>
  );
};

export default AdminHome1;
