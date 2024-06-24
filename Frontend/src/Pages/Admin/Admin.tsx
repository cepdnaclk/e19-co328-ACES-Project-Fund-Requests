// Admin.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Grid,
  SkeletonText,
  Stack,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import Header from "../../components/Header";
import FooterSection from "../../components/FooterSection";
import CardComponent from "../CardComponent";
import cardImage from "../../assets/images/cardImage.webp";
import axios from "axios";
import { PreviousRequest } from "../../models/PreviousRequest";
import { DUserTokenInterface } from "../../models/TokenMoodel";
import LoginModal from "../../components/LoginModal";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [allRequests, setAllRequests] = useState<PreviousRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToken, setUserToken] = useState<DUserTokenInterface | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/getall");
        setAllRequests(response.data.docs);
      } catch (error) {
        setError("Error fetching requests");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userToken == null) {
      onOpen();
    } else {
      onClose();
      console.log("Closed the modal");
      fetchAllRequests();
    }
  }, [userToken, onOpen, onClose]);

  const handleViewMore = (id: string) => {
    navigate(`/admin1/${id}`); // Corrected route path to use `/admin1/:id`
  };

  return (
    <>
      <LoginModal
        isOpen={isOpen}
        onClose={onClose}
        setUserToken={setUserToken}
      />
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
            ) : error ? (
              <Text color="red.500">{error}</Text>
            ) : (
              allRequests.map((eachRequest) => (
                <Box key={eachRequest._id}>
                  <CardComponent
                    cardImage={cardImage}
                    bgColor="#BFD8F8"
                    title={eachRequest.project_title}
                    description={eachRequest.project_description}
                    requestDate="2023-10-18"
                  />
                  <Button
                    mt={2}
                    colorScheme="teal"
                    onClick={() => handleViewMore(eachRequest._id)}
                  >
                    View More
                  </Button>
                </Box>
              ))
            )}
          </Grid>
        </form>
      </Box>
      <Box width={"100%"} position={"fixed"} bottom={0}>
        <FooterSection />
      </Box>
    </>
  );
};

export default Admin;
