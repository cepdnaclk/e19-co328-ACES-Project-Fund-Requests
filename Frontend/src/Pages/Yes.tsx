import React from "react";
import Header from "../components/Header";
import { Input, Button, FormControl, Text, Grid, GridItem, Box } from "@chakra-ui/react";
import FooterSection from "../components/FooterSection";
import emailjs from 'emailjs-com';
import { useNavigate } from "react-router-dom";

const gridBackgrougndColor = "#F5F5F5";
const labelColor = "black";

const Yes = () => {
  const [billSettle, setBillSettle] = React.useState("");
  const [reportSubmit, setReportSubmit] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  const sendEmail = (templateParams) => {
    emailjs.send('service_t7usi6m', 'template_ojlf31n', templateParams, 'oju11hQbtondf0x7i')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Email sent successfully!');
      }, (error) => {
        console.error('FAILED...', error);
        alert('Failed to send email.');
      });
  };

  const onSubmitClick = () => {
    if (reportSubmit === "" || billSettle === "") {
      alert("Select all required fields!");
    } else {
      setIsLoading(true);
      const templateParams = {
        to_name: "Student Name", // Replace with dynamic student name
        from_name: "Eranga", // Replace with your name or sender's name
        message: `Your project "Secure Network Infrastructure Enhancement Project" has been approved. The bills are to be settled by ${billSettle} and the report is to be submitted by ${reportSubmit}.`
      };
      sendEmail(templateParams);
      setIsLoading(false);
      navigate("/admin");
    }
    console.log("reportSubmit ", reportSubmit);
    console.log("billSettle ", billSettle);
  };

  return (
    <>
      <Header />

      {isLoading ? (
        <Text
          margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
          fontWeight={"bold"}
          color={"grey"}
        >
          Submitting, please wait...
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
                <Input
                  disabled
                  margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
                  width={{ base: "80%", md: "85%", lg: "90%" }}
                  variant="outline"
                  borderColor="black"
                  placeholder="Yes"
                  color="grey"
                  value="Yes"
                  readOnly
                />
              </GridItem>
            </Grid>

            <Grid
              paddingX={{ base: "20px", md: "10%" }}
              paddingY={{ base: "20px", md: "2%" }}
              bg={gridBackgrougndColor}
              borderRadius={"20px"}
              templateAreas={{
                base: `"title" "inputArea"`,
                md: `"title" "inputArea"`,
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
                  <Input
                    margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
                    width={{ base: "80%", md: "85%", lg: "90%" }}
                    variant="outline"
                    borderColor="black"
                    type="date"
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
                base: `"title" "inputArea"`,
                md: `"title" "inputArea"`,
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
                  The date on which the report is to be submitted:
                </Text>
              </GridItem>
              <GridItem area={"inputArea"}>
                <FormControl>
                  <Input
                    margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
                    width={{ base: "80%", md: "85%", lg: "90%" }}
                    variant="outline"
                    borderColor="black"
                    type="date"
                    placeholder="Select date"
                    value={reportSubmit}
                    onChange={(e) => {
                      setReportSubmit(e.target.value);
                    }}
                  />
                </FormControl>
              </GridItem>
            </Grid>

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
