import React from "react";
import Header from "../components/Header";
import { Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { Text, Grid, GridItem, Box } from "@chakra-ui/react";
import FooterSection from "../components/FooterSection";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const gridBackgrougndColor = "#F5F5F5";
// const inputFieldTextColor = "black";
const labelColor = "black";

const Yes = () => {
  //2013.11.26 start
  const [billSettle, setBillSettle] = React.useState("");
  const [reportSubmit, setReportSubmit] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  const onSubmitClick = () => {
    if (reportSubmit == "" || billSettle == "") {
      alert("Select all required fields !");
    } else {
      setIsLoading(true);
      const obj = {
        id: "652ffd472fd82b9a09fd96e9",
        billSettle: billSettle,
        reportSubmit: reportSubmit,
      };
      axios
        .post("http://localhost:5000/approved", obj)
        .then((res) => {
          setIsLoading(false);
          if (res.status == 200) {
            navigate("/admin");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error);
        });
    }
    console.log("reportSubmit ", reportSubmit);
    console.log("billSettle ", billSettle);
  };
  //2013.11.26 end

  return (
    <>
      <Header></Header>

      {isLoading ? (
        <Text
          margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
          fontWeight={"bold"}
          color={"grey"}
        >
          Submiting please wait ......
        </Text>
      ) : (
        <>
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
              Project “Secure Network Infrastructure Enhancement Project”
            </Text>
          </Box>

          <Box
            pb={"107px"}
            paddingX={{ base: "15%", md: "20%" }}
            className="AdminUiTexts"
          >
            <Text fontWeight={"bold"} color={"grey"}>
              Do you agree to provide financial support for the project
              mentioned above?
            </Text>

            <Grid
              templateAreas={{
                base: `"textitem" "input" "button1"`,
                md: `"textitem" "input button1"`,
              }}
              gridTemplateColumns={{ md: "50% 50%", lg: "50% 50%" }}
              gap={2}
              marginBottom={5}
            >
              <GridItem area={"input"}>
                {/* <Input
              margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
              width={{ base: "80%", md: "85%", lg: "90%" }}
              variant="outline" 
              borderColor="black" 
              placeholder="Yes / No" 
            /> */}
                <Input
                  disabled
                  margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
                  width={{ base: "80%", md: "85%", lg: "90%" }}
                  variant="outline"
                  borderColor="black"
                  placeholder="Yes"
                  color="grey"
                  value="Yes" // Set the initial value to "Yes"
                  readOnly // Make the input read-only
                />
              </GridItem>
            </Grid>

            {/* <GridItem area={"dates"}> */}
            {/* <GridItem area={"title"} colSpan={1}>
            <Text
              fontWeight="bold"
              marginTop={2}
              whiteSpace={"nowrap"}
              color={labelColor}
            >
              Fund offering date
            </Text>
          </GridItem>
          <GridItem
            area={"answer"}
            bg={gridBackgrougndColor}
            borderRadius={7}
            colSpan={1}
            paddingX={{ base: "20px", md: "5%" }}
            paddingY={{ base: "10px", md: "2%", lg: "3%"}}
            margin={{base: "10%", md: "2%"}}
          >
            <FormControl>
             {/* <FormLabel>Project fund giving date</FormLabel> */}
            {/* <Input
                margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
                width={{ base: "80%", md: "85%", lg: "90%" }}
                variant="outline"
                borderColor="black"
                type="date" // Use the 'date' type for date input
                placeholder="Select date"
              />
            </FormControl>
          </GridItem>
          <GridItem area={"title"} colSpan={1}>
            <Text
              fontWeight="bold"
              marginTop={2}
              whiteSpace={"nowrap"}
              color={labelColor}
            >
              Fund offering date
            </Text>
          </GridItem>
          <GridItem
            area={"answer"}
            bg={gridBackgrougndColor}
            borderRadius={7}
            colSpan={1}
            paddingX={{ base: "20px", md: "5%" }}
            paddingY={{ base: "10px", md: "2%", lg: "3%"}}
            margin={{base: "10%", md: "2%"}}
          >
            <FormControl>
             {/* <FormLabel>Project fund giving date</FormLabel> */}
            {/* <Input
                margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
                width={{ base: "80%", md: "85%", lg: "90%" }}
                variant="outline"
                borderColor="black"
                type="date" // Use the 'date' type for date input
                placeholder="Select date" */}
            {/* /> */}
            {/* </FormControl>
          </GridItem> */}

            {/* <GridItem area={"input2"}> */}

            <Grid
              paddingX={{ base: "20px", md: "10%" }}
              paddingY={{ base: "20px", md: "2%" }}
              bg={gridBackgrougndColor}
              borderRadius={"20px"}
              templateAreas={{
                base: `"title"
            "inputArea"`,

                md: `"title" 
            "inputArea"`,
              }}
              gridTemplateColumns={{ md: "0.6fr 1.4fr" }}
              gap={3}
              marginBottom={5}
            >
              <GridItem area={"title"}>
                <Text
                  marginTop={2}
                  whiteSpace={"nowrap"}
                  color={labelColor}
                  fontWeight={"bold"}
                >
                  The date on which the bills are to be settled:
                </Text>
              </GridItem>
              <GridItem area={"inputArea"}>
                <FormControl>
                  {/* <FormLabel>Project fund giving date</FormLabel> */}
                  <Input
                    margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
                    width={{ base: "80%", md: "85%", lg: "90%" }}
                    variant="outline"
                    borderColor="black"
                    type="date" // Use the 'date' type for date input
                    placeholder="Select date"
                    value={billSettle}
                    onChange={(e) => {
                      setBillSettle(e.target.value);
                    }}
                  />
                </FormControl>
              </GridItem>
            </Grid>

            <Grid
              paddingX={{ base: "20px", md: "10%" }}
              paddingY={{ base: "20px", md: "2%" }}
              bg={gridBackgrougndColor}
              borderRadius={"20px"}
              templateAreas={{
                base: `"title"
            "inputArea"`,

                md: `"title" 
            "inputArea"`,
              }}
              gridTemplateColumns={{ md: "0.6fr 1.4fr" }}
              gap={3}
              marginBottom={5}
            >
              <GridItem area={"title"}>
                <Text
                  marginTop={2}
                  whiteSpace={"nowrap"}
                  color={labelColor}
                  fontWeight={"bold"}
                >
                  The date on which the report to be submitted:
                </Text>
              </GridItem>
              <GridItem area={"inputArea"}>
                <FormControl>
                  {/* <FormLabel>Project fund giving date</FormLabel> */}
                  <Input
                    margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
                    width={{ base: "80%", md: "85%", lg: "90%" }}
                    variant="outline"
                    borderColor="black"
                    type="date" // Use the 'date' type for date input
                    placeholder="Select date"
                    value={reportSubmit}
                    onChange={(e) => {
                      setReportSubmit(e.target.value);
                    }}
                  />
                </FormControl>
              </GridItem>
            </Grid>

            {/* </GridItem> */}
            {/* <Text
              fontSize={"smaller"}
              margin={{ base: "5% 0% 0%", md: "3% 0% 0%" }}
              color={"#757070"}
            >
              Provide your decision by typing Yes / No
            </Text> */}

            {/* </GridItem> */}

            {/* <GridItem area={"button1"}> */}
            <Button
              onClick={onSubmitClick}
              marginTop={"2%"}
              marginBottom={"5%"}
              colorScheme="red"
              variant="outline"
              paddingX={"25px"}
              paddingY={"13px"}
              borderRadius={"20px"}
              size={"s"}
            >
              SUBMIT
            </Button>
            {/* </GridItem> */}
            {/* </Grid> */}
          </Box>
        </>
      )}

      <Box width={"100%"} position={"fixed"} bottom={0}>
        <FooterSection />
      </Box>
    </>
  );
};

export default Yes;
