import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useEffect
import { useDisclosure } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";

import StudentHome from "./Pages/StudentHome";
import Admin from "./Pages/Admin/Admin";
import AdminWrapper from "./Pages/Admin/AdminWrapper";
import AdminHome1 from "./Pages/Admin/AdminHome1";
import AdminHome2 from "./Pages/Admin/AdminHome2";
import AdminHome3 from "./Pages/Admin/AdminHome3";
import Yes from "./Pages/Yes";
import No from "./Pages/No";
import Chatbotpage from "./Pages/Chatbotpage";
import LoginModal from "./components/LoginModal";

import { DUserTokenInterface } from "./models/TokenMoodel";
import { PreviousRequest } from "./models/PreviousRequest";
// import Yes from "./Pages/Yes";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToken, setUserToken] = useState<DUserTokenInterface | null>(null);
  const [previousRequest, setPreviousRequest] = useState<PreviousRequest | null>(null);

  useEffect(() => {
    if (userToken == null) {
      onOpen();
    } else {
      onClose();
      console.log("Closed the modal");
      axios
        .get(`http://localhost:5000/findrequest/${userToken.email}`)
        .then((response) => {
          setPreviousRequest(response.data);
          console.log(response.data);
        });
    }
  }, [userToken, onOpen, onClose]);


  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <>
              <LoginModal isOpen={isOpen} onClose={onClose} setUserToken={setUserToken} />              {/* <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                size="sm"
                isCentered
              >
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px) " />
                <ModalContent p="5">
                  <ModalHeader
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p = "2"
                  >
                    ACES Project Fund Requests
                  </ModalHeader>
                  <ModalBody
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text pb="4" fontSize="sm">
                      You need to login with your eng email
                    </Text>
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
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
              </Modal>  */}
              <StudentHome
                previousRequest={previousRequest}
                userToken={userToken}
              />
            </>
          }
        />
        {/* <Route path="/" element={<Navigate to="/student" replace />} /> */}
        <Route path="/student" element={<StudentHome previousRequest={previousRequest} userToken={userToken} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin1" element={<AdminHome1 />} />
        <Route path="/admin2" element={<AdminHome2 />} />
        <Route path="/admin3" element={<AdminHome3 />} />
        <Route path="/yes" element={<Yes />} />
        <Route path="/no" element={<No />} />
        <Route path="/faqbot" element={<Chatbotpage />} />
      </Routes>
    </BrowserRouter>
  );
} 

export default App