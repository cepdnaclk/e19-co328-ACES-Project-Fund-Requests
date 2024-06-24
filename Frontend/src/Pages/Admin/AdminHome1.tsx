// AdminHome1.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Text, Grid, GridItem, Box } from "@chakra-ui/react";
import Header from "../../components/Header";
import FooterSection from "../../components/FooterSection";
import NextButtonAdmin from "../NextButtonAdmin";

const gridBackgroundColor = "#F5F5F5";
const labelColor = "black";

const AdminHome1 = () => {
  const { id } = useParams<{ id: string }>(); // Dynamically obtain the 'id' from the URL
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Make sure ID exists before fetching
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/find/${id}`);
        setData(response.data);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  if (!data) {
    return <Text>No data found for ID: {id}</Text>;
  }

  return (
    <>
      <Header />
      <Box paddingTop={"7%"} paddingBottom={"2%"} paddingX={"10%"}>
        <Text
          color={"#00334E"}
          fontSize={"20px"}
          fontWeight={"normal"}
          paddingBottom={"20px"}
        >
          {data.project_title}
        </Text>
      </Box>

      <Box pb={"107px"}>
        <form className="AdminUiTexts">
          {/* Project Type */}
          <Grid
            paddingX={{ base: "20px", md: "10%" }}
            paddingY={{ base: "10px", md: "1%" }}
            templateAreas={{ base: `"title" "answer"`, md: `"title answer"` }}
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
              bg={gridBackgroundColor}
              borderRadius={7}
              colSpan={1}
              paddingX={{ base: "20px", md: "5%" }}
              paddingY={{ base: "10px", md: "2%" }}
            >
              <Text color={labelColor}>{data.project_type}</Text>
            </GridItem>
          </Grid>

          {/* Project Description */}
          <Grid
            paddingX={{ base: "20px", md: "10%" }}
            paddingY={{ base: "10px", md: "1%" }}
            templateAreas={{ base: `"title" "answer"`, md: `"title answer"` }}
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
              bg={gridBackgroundColor}
              borderRadius={7}
              colSpan={1}
              paddingX={{ base: "20px", md: "5%" }}
              paddingY={{ base: "10px", md: "2%" }}
            >
              <Text color={labelColor}>{data.project_description}</Text>
            </GridItem>
          </Grid>

          {/* Project Goals and Roadmap */}
          <Grid
            paddingX={{ base: "20px", md: "10%" }}
            paddingY={{ base: "10px", md: "1%" }}
            templateAreas={{ base: `"title" "answer"`, md: `"title answer"` }}
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
              bg={gridBackgroundColor}
              borderRadius={7}
              colSpan={1}
              paddingX={{ base: "20px", md: "5%" }}
              paddingY={{ base: "10px", md: "2%" }}
            >
              <Text color={labelColor}>{data.goals}</Text>
            </GridItem>
          </Grid>

          {/* Project Risks and Reduction */}
          <Grid
            paddingX={{ base: "20px", md: "10%" }}
            paddingY={{ base: "10px", md: "1%" }}
            templateAreas={{ base: `"title" "answer"`, md: `"title answer"` }}
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
              bg={gridBackgroundColor}
              borderRadius={7}
              colSpan={1}
              paddingX={{ base: "20px", md: "5%" }}
              paddingY={{ base: "10px", md: "2%" }}
            >
              <Text color={labelColor}>{data.risks}</Text>
            </GridItem>
          </Grid>

          {/* Starting Date */}
          <Grid
            paddingX={{ base: "20px", md: "10%" }}
            paddingY={{ base: "10px", md: "1%" }}
            templateAreas={{ base: `"title" "answer"`, md: `"title answer"` }}
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
              bg={gridBackgroundColor}
              borderRadius={7}
              colSpan={1}
              paddingX={{ base: "20px", md: "5%" }}
              paddingY={{ base: "10px", md: "2%" }}
            >
              <Text color={labelColor}>{data.starting_date}</Text>
            </GridItem>
          </Grid>

          {/* Ending Date */}
          <Grid
            paddingX={{ base: "20px", md: "10%" }}
            paddingY={{ base: "10px", md: "1%" }}
            templateAreas={{ base: `"title" "answer"`, md: `"title answer"` }}
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
              bg={gridBackgroundColor}
              borderRadius={7}
              colSpan={1}
              paddingX={{ base: "20px", md: "5%" }}
              paddingY={{ base: "10px", md: "2%" }}
            >
              <Text color={labelColor}>{data.ending_date}</Text>
            </GridItem>
          </Grid>

          {/* Budget Report */}
          {/* Uncomment this section once the link is fixed */}
          {/* <Grid
            paddingX={{ base: "20px", md: "10%" }}
            paddingY={{ base: "10px", md: "1%" }}
            templateAreas={{ base: `"title" "answer"`, md: `"title answer"` }}
            gridTemplateColumns={{ md: "30% 70%" }}
            gap={4}
            marginBottom={5}
          >
            <GridItem area={"title"} colSpan={1}>
              <Text fontWeight="bold" marginTop={2} whiteSpace={"nowrap"} color={labelColor}>
                Budget Report
              </Text>
            </GridItem>
            <GridItem
              area={"answer"}
              bg={gridBackgroundColor}
              borderRadius={7}
              colSpan={1}
              paddingX={{ base: "20px", md: "5%" }}
              paddingY={{ base: "10px", md: "2%" }}
            >
              <Link color={"blue.700"} to={data.budget_report_url} target="_blank" rel="noopener noreferrer">
                Download Budget Report
              </Link>
            </GridItem>
          </Grid> */}

          {/* Next Button */}
          <Grid
            paddingX={{ base: "20px", md: "10%" }}
            paddingY={{ base: "10px", md: "1%" }}
          >
            <Link to="/admin2">
              <NextButtonAdmin
                currrentStep={0}
                onStepperChange={() => {
                  // Handle stepper change if needed
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

export default AdminHome1;
