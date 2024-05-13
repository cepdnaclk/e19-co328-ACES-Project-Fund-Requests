import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import jwt_decode from "jwt-decode";

import Header from "../components/Header";
import FooterSection from "../components/FooterSection";
import CardComponent from "./CardComponent";
import cardImage from "../assets/images/cardImage.webp";
import axios from "axios";
import { PreviousRequest } from "../models/PreviousRequest";
import { DUserTokenInterface } from "../models/TokenMoodel";
import { GoogleLogin } from "@react-oauth/google";
//import axios from "axios";

// interface RequestData {
//     Project_title: string;
//     Project_description: string;
//     starting_date: string;
//     hod_response: boolean;
//     // Add other properties as needed
//   }

const Admin = () => {
  const [allRequests, setAllReusts] = useState<PreviousRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToken, setUserToken] = useState<DUserTokenInterface | null>(null);

  // const [latestRequests, setLatestRequests] = useState<RequestData[]>([]);
  // const [previousRequests, setPreviousRequests] = useState<RequestData[]>([]);

  useEffect(() => {
    if (userToken == null) {
      onOpen();
    } else {
      onClose();
      console.log("Closed the modal");

      setIsLoading(true);

      axios
        .get("http://localhost:5000/getall")
        .then((response) => {
          console.log(response.data.docs[0]);

          setAllReusts(response.data.docs);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
          setIsLoading(false);
        });
    }
  }, [userToken]);

  // useEffect(() => {
  //   // Fetch the requests from your backend API
  //   setIsLoading(true);
  //   console.log("Start sending");

  //   // axios
  //   //   .get("http://localhost:5000/getall")
  //   //   .then((response) => {
  //   //     console.log(response.data.docs[0]);

  //   //     setAllReusts(response.data.docs);
  //   //     setIsLoading(false);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error fetching requests:", error);
  //   //     setIsLoading(false);
  //   //   });
  // }, []);

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
        isCentered
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px) " />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            ACES Project Fund Requests
          </ModalHeader>
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text pb="3" fontSize="sm">
              You need to login with your eng email
            </Text>
            <GoogleLogin
              onSuccess={(credentialResponse: { credential: any }) => {
                console.log(credentialResponse);

                var decodedUserToken: DUserTokenInterface = jwt_decode(
                  credentialResponse.credential!
                );

                setUserToken(decodedUserToken);

                console.log(decodedUserToken);

                onClose();
              }}
              onError={() => {
                onOpen();
                console.log("Login Failed");
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Header />
      <Box pb={"107px"}>
        <form className="AdminUiTexts">
          <Box
            paddingTop={"7%"}
            paddingBottom={"2%"}
            paddingX={"10%"}
            display={"block"}
          >
            <Text
              color={"#00334E"}
              fontSize={"30px"}
              fontWeight={"bold"}
              paddingBottom={"4px"}
              fontFamily={"Poppins, sans-serif"}
            >
              Welcome To Project Fund Requests👋
            </Text>
            <Divider my={10} />
            <Text
              color={"#00334E"}
              fontSize={"20px"}
              fontWeight={"small"}
              paddingBottom={"10px"}
              fontFamily={"Poppins, sans-serif"}
            >
              Latest Requests
            </Text>
          </Box>

          {/* <Grid
          paddingX={{ base: "10%", md: "10%" }}
          paddingY={{ base: "10px" }}
          templateAreas={{
            base: `"card1" "card2"`,
            md: `"card1 card2"`,
          }}
          gap={4}
          marginBottom={0}
          fontFamily="Poppins, sans-serif"
        >
          {latestRequests.map((request, index) => (
            <GridItem area={`card${index + 1}`} colSpan={1} alignItems="center" key={index}>
              <CardComponent
                cardImage={cardImage}
                bgColor="#BFD8F8"
                title={request.Project_title}
                description={request.Project_description}
                requestDate={request.starting_date}
              />
            </GridItem>
          ))}
        </Grid> */}

          {/* <Grid
          paddingX={{ base: "10%", md: "10%",lg: "%10" }}
          paddingBottom={{ base: "10px" }}
          // templateAreas={{
          //   base: `"card1" "card2" "card3"`,
          //     md: `"card1 card2" 
          //     "card3"`,
          //     lg: `"card1 card2 card3"`
          // }}
          gap={4}
          marginBottom={5}
          fontFamily="Poppins, sans-serif"
        >
          <GridItem area={`card`} colSpan={2} alignItems="center">
            {isLoading ? (
              <Stack>
                <SkeletonText></SkeletonText>
                <SkeletonText></SkeletonText>
              </Stack>
            ) : (
              allRequests.map((eachRequest) => {
                return (
                  <CardComponent
                    key={eachRequest._id}
                    cardImage={cardImage}
                    bgColor="#BFD8F8"
                    title={eachRequest.project_title}
                    description={eachRequest.project_description}
                    requestDate="2023-10-18"
                  />
                );
              })
            )} */}
          <Grid
            paddingX={{ base: "10%", md: "10%", lg: "10%" }}
            paddingBottom={{ base: "10px" }}
            gap={4}
            marginBottom={5}
            fontFamily="Poppins, sans-serif"
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
          >
            {isLoading ? (
              <Stack>
                <SkeletonText></SkeletonText>
                <SkeletonText></SkeletonText>
              </Stack>
            ) : (
              allRequests.map((eachRequest) => {
                return (
                  <CardComponent
                    key={eachRequest._id}
                    cardImage={cardImage}
                    bgColor="#BFD8F8"
                    title={eachRequest.project_title}
                    description={eachRequest.project_description}
                    requestDate="2023-10-18"
                  />
                );
              })
            )}
          </Grid>

          {/* <CardComponent
              cardImage={cardImage}
              bgColor="#BFD8F8"
              title="Automated Inventory Management..."
              description="The project aims to upgrade the existing manual inventory management system of a small retail business to an automated system. This upgrade is crucial..."
              requestDate="2023-10-18"
            /> */}
          {/* </GridItem> */}
          {/* <GridItem area={`card2`} colSpan={1} alignItems="center">
            <CardComponent
                cardImage={cardImage}
                bgColor="#BFD8F8"
                title="First Card"
                description="Description for the first card."
                requestDate="2023-10-17"
            />
            </GridItem> */}
          {/* </Grid> */}
          <Divider my={4} />
          {/* <Box
          paddingTop={"4%"}
          paddingBottom={"3%"}
          paddingX={"10%"}
          display={"block"}
        >
          <Text
            color={"#00334E"}
            fontSize={"20px"}
            fontWeight={"small"}
            paddingBottom={"10px"}
            fontFamily={"Poppins, sans-serif"}
          >
            Older Requests
          </Text>
        </Box>

        
          <Grid
            paddingX={{ sm: "10%", md: "10%" }}
            paddingBottom={{ base: "10px" }}
            templateAreas={{
              base: `"card1" "card2" "card3"`,
              md: `"card1 card2" 
              "card3"`,
              lg: `"card1 card2 card3"`
            }}
            gap={4}
            marginBottom={5}
            fontFamily="Poppins, sans-serif"
          >
            <GridItem area={`card1`} colSpan={1} alignItems="center" className="grids">
              <CardComponent
                cardImage={cardImage}
                bgColor="#CDCDCD"
                title="1st Card"
                description="Description for the 1st card."
                requestDate="2023-10-17"
              />
            </GridItem>
            <GridItem area={`card2`} colSpan={1} alignItems="center" className="grids">
              <CardComponent
                cardImage={cardImage}
                bgColor="#CDCDCD"
                title="2nd Card"
                description="Description for the 2nd card."
                requestDate="2023-10-17"
              />
            </GridItem>
            <GridItem area={`card3`} colSpan={1} alignItems="center" className="grids">
              <CardComponent
                cardImage={cardImage}
                bgColor="#CDCDCD"
                title="3rd Card"
                description="Description for the first card."
                requestDate="2023-10-17"
              />
            </GridItem>
          </Grid> */}

          {/* {previousRequests.map((request, index) => (
            <GridItem area={`card${index + 1}`} colSpan={1} alignItems="center" key={index}>
              <CardComponent
                cardImage={cardImage}
                bgColor="#CDCDCD"
                title={request.Project_title}
                description={request.Project_description}
                requestDate={request.starting_date}
              />
            </GridItem>
          ))} */}
        </form>
      </Box>
      <Box width={"100%"} position={"fixed"} bottom={0}>
        <FooterSection />
      </Box>
    </>
  );
};

export default Admin;
