import FooterSection from "../components/FooterSection";
import Header from "../components/Header";
import NextButtonAdmin from "./NextButtonAdmin";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Text, Grid, GridItem, Link, Box } from "@chakra-ui/react";

// Define the type for the data object
interface ProjectData {
  projectType: string;
  projectDescription: string;
  projectGoals: string;
  roadmap: string;
  risks: string;
  riskReduction: string;
  startDate: string;
  endDate: string;
  budgetReportUrl: string;
}

const gridBackgrougndColor = "#F5F5F5";
const labelColor = "black";

const AdminHome1 = () => {
  const [data, setData] = useState<ProjectData | null>(null);
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

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Header />

      <Box
        paddingTop={"7%"}
        paddingBottom={"2%"}
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
              <Text color={labelColor}>{data.projectType || "N/A"}</Text>
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
              <Text color={labelColor}>{data.projectDescription || "N/A"}</Text>
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
              <Text color={labelColor}>{data.projectGoals || "N/A"}</Text>
              <Text mt={5}>{data.roadmap || "N/A"}</Text>
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
              <Text color={labelColor}>{data.risks || "N/A"}</Text>
              <Text mt={5}>{data.riskReduction || "N/A"}</Text>
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
              <Text color={labelColor}>{data.startDate || "N/A"}</Text>
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
              <Text color={labelColor}>{data.endDate || "N/A"}</Text>
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
                Budget Report
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
              <Link color={"blue.700"} href={data.budgetReportUrl || "#"} download>
                Budget report.pdf
              </Link>
            </GridItem>
          </Grid>

          {/* Next Button */}
          <Grid paddingX={{ base: "20px", md: "10%" }} paddingY={{ base: "10px", md: "1%" }}>
            <Link href="/admin2">
              <NextButtonAdmin currrentStep={0} onStepperChange={() => {}} />
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

export default AdminHome1;
