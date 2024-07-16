import { Text, Grid, GridItem, Input, Box, Link, IconButton } from "@chakra-ui/react";
import { FaQuestionCircle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useToast } from "@chakra-ui/react";
import FundRequest from "../classes/fund_request";
import { useState } from "react";
import axios from "axios";

const inputBorderColor = "#97bfd4";
const gridBackgrougndColor = "#F5F5F5";
const inputFieldTextColor = "black";
const labelColor = "black";

interface Props {
  onSetRequestObject: (requestobj: FundRequest) => void;
  requestObject: FundRequest | null;
  onFinalSubmit: (status: boolean) => void;
  onFinish: (finioshed: boolean) => void;
}

const schema = z.object({
  lecturerName: z.string().min(3, {
    message: "The name should be atleast 3 characters long!",
  }),

  lectureremail: z
    .string()
    .email({ message: "Please enter a valid email address" }),
});

type formData = z.infer<typeof schema>;

const FormSection3 = ({
  onFinalSubmit,
  requestObject,
  //onSetRequestObject,
  //onFinish,
}: Props) => {
  const toast = useToast();
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });
  return (
    <Box paddingX={"10%"} display={"block"}>
      <Text
        color={"#00334E"}
        fontSize={"24px"}
        fontWeight={"normal"}
        paddingBottom={"60px"}
      >
        Approval of the Project
      </Text>
      <Box
        paddingX={{ base: "20px", md: "10%" }}
        paddingY={{ base: "20px", md: "2%" }}
        bg={gridBackgrougndColor}
        marginBottom={5}
      >
        <Text paddingBottom={"25px"} whiteSpace={"normal"} color={labelColor}>
          Information about the Lecture In-charge
        </Text>

        <form
          onSubmit={handleSubmit((data) => {
            if (isValid) {
              if (requestObject != null) {
                requestObject = {
                  ...requestObject,
                  lecturerName: data.lecturerName,
                  lecturerEmail: data.lectureremail,
                };

                console.log("section 3: ", requestObject);
                setIsLoading(true);

                axios
                  .post("http://localhost:5000/fundRequest", requestObject)
                  .then((res) => {
                    setIsFinished(true);

                    console.log("REady to display the toast");
                    console.log(res.data.data.lecturerName);

                    // requestObject!["lecturerName"] = res.data.data.lecturerName;
                    // requestObject!["lecturerEmail"] =
                    //   res.data.data.lecturerEmail;

                    if (res.status == 200) {
                      toast({
                        title: "Completed the Request",
                        description:
                          "You've successfully Completed the request",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                      });
                    }
                    onFinalSubmit(res.status == 200);
                    console.log(res.status);
                    setIsLoading(false);
                  })
                  .catch((err) => {
                    console.log(err);
                    setIsError(true);
                    setIsLoading(false);
                  });
              }
            }

            console.log(data);
          })}
          action=""
        >
          <Grid
            alignContent={"center"}
            alignItems={"center"}
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
            <GridItem
              alignContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
              area={"title"}
            >
              <Text whiteSpace={"nowrap"} color={labelColor}>
                Name
              </Text>
            </GridItem>
            <GridItem
              alignContent={"center"}
              alignItems={"center"}
              area={"inputArea"}
            >
              <Input
                {...register("lecturerName")}
                variant={"Outline"}
                size="md"
                borderRadius={0}
                color={inputFieldTextColor}
                // border={"1px solid ${#97bfd4}"}
                border={
                  errors.lecturerName
                    ? `1px solid red`
                    : `1px solid ${inputBorderColor}`
                }
              ></Input>
              {errors.lecturerName && (
                <Text fontSize="xs" color="red">
                  {errors.lecturerName.message}
                </Text>
              )}
            </GridItem>
          </Grid>
          <Grid
            alignContent={"center"}
            alignItems={"center"}
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
            <GridItem
              alignContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
              area={"title"}
            >
              <Text whiteSpace={"nowrap"} color={labelColor}>
                Email
              </Text>
            </GridItem>
            <GridItem area={"inputArea"}>
              <Input
                {...register("lectureremail")}
                variant={"Outline"}
                size="md"
                borderRadius={0}
                color={inputFieldTextColor}
                // border={"1px solid ${#97bfd4}"}
                border={
                  errors.lectureremail
                    ? `1px solid red`
                    : `1px solid ${inputBorderColor}`
                }
              ></Input>
              {errors.lectureremail && (
                <Text fontSize="xs" color="red">
                  {errors.lectureremail.message}
                </Text>
              )}
            </GridItem>
          </Grid>
          {isFinished == true && isLoading == false ? (
            <Text color="green">Request Submitted Successfully</Text>
          ) : isFinished == false && isLoading == false ? (
            <button
              onClick={() => {
                // event?.preventDefault();
                // onFinalSubmit(isValid);
              }}
              className="submit-btn"
              type="submit"
            >
              SUBMIT
            </button>
          ) : (
            <Text color="black">waiting...</Text>
          )}
          {isError && (
            <Text color={"red.500"}>
              Error Occurred. Please try again later!
            </Text>
          )}
        </form>
        <Box position="fixed" bottom="4" right="4">
        <Link href="faqbot">
          <IconButton
            aria-label="FAQ"
            icon={<FaQuestionCircle />}
            size="lg"
            colorScheme="teal"
            isRound
          />
        </Link>
      </Box>
        {/* <Box textAlign={"end"}>
          <Button
            bgColor={"#FEFAFA"}
            boxShadow={"lg"}
            style={{
              fontFamily: "'Outfit', sans-serif", // Use the custom font
            }}
            fontWeight={"thin"}
            _hover={{ bgColor: "black", color: "white" }}
            border={"1px solid black"}
            height={"45px"}
            width={"135px"}
            borderRadius={"30px"}
          >
            SUBMIT
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
  // hi
};

export default FormSection3;
