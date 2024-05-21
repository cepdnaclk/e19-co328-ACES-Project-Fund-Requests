import React from "react";
import Header from "../components/Header";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { Text, Grid, GridItem, Box } from "@chakra-ui/react";
import FooterSection from "../components/FooterSection";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const inputBorderColor = "#97bfd4";
const gridBackgrougndColor = "#F5F5F5";
const inputFieldTextColor = "black";
const labelColor = "black";

const No = () => {
  //2013.11.26 start
  const [reason, setReason] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const onSubmitClick = () => {
    if (reason == "") {
      alert("Please provide a reason !");
    } else {
      setIsLoading(true);
      const obj = {
        id: "652ffd472fd82b9a09fd96e9",
        reason: reason,
      };
      axios
        .post("http://localhost:5000/denied", obj)
        .then((res) => {
          setIsLoading(false);
          navigate("/admin");
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error);
        });
    }
  };
  //2013.11.26 end

  return (
    <>
      <Box as="header">
        <Header></Header>
      </Box>

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
                  disabled
                  margin={{ base: "0% 0% 1%", md: "0% 0% 3%" }}
                  width={{ base: "80%", md: "85%", lg: "90%" }}
                  variant="outline"
                  borderColor="black"
                  placeholder="No"
                  color="grey"
                  value="No"
                  readOnly
                />
              </GridItem>
            </Grid>

            <Grid
              paddingX={{ base: "20px", md: "10%" }}
              paddingY={{ base: "20px", md: "2%" }}
              bg={gridBackgrougndColor}
              templateAreas={{
                base: `"title"
            "inputArea"`,

                md: `"title inputArea"`,
              }}
              gridTemplateColumns={{ md: "0.6fr 1.4fr" }}
              gap={3}
              marginBottom={5}
            >
              <GridItem area={"title"}>
                <Text whiteSpace={"nowrap"} color={labelColor}>
                  Reason
                </Text>
              </GridItem>
              <GridItem area={"inputArea"}>
                <Textarea
                  //   {...register("description")}
                  variant={"Outline"}
                  borderRadius={0}
                  size={"md"}
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                  color={inputFieldTextColor}
                  marginBottom={2}
                  //   border={
                  //     errors.description
                  //       ? `1px solid red`
                  //       : `1px solid ${inputBorderColor}`
                  //   }
                ></Textarea>
                {/* {errors.description && (
              <Text fontSize="xs" color="red">
                {errors.description.message}
              </Text>
            )} */}
              </GridItem>
            </Grid>

            <GridItem area={"button1"}>
              <Button
                onClick={onSubmitClick}
                marginTop={"2%"}
                marginBottom={"5%"}
                colorScheme="red"
                variant="outline"
                paddingX={"20px"}
                paddingY={"13px"}
                borderRadius={"20px"}
                size={"s"}
              >
                SUBMIT
              </Button>
            </GridItem>
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

export default No;
function register(arg0: string) {
  throw new Error("Function not implemented.");
}
