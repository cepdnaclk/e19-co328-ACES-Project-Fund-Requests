import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { DUserTokenInterface } from "../models/TokenMoodel";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  setUserToken: (token: DUserTokenInterface | null) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  setUserToken,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    const decodedUserToken: DUserTokenInterface = jwt_decode(
      credentialResponse.credential!
    );
    const email = decodedUserToken.email.toLowerCase(); // Ensure email is lowercase for consistent comparison
    // Check if the email is an admin email or e19304@eng.pdn.ac.lk
    if (
      email === "asithab@eng.pdn.ac.lk" ||
      email === "roshanr@eng.pdn.ac.lk" ||
      email === "e19111@eng.pdn.ac.lk"
    ) {
      setUserToken(decodedUserToken);
      onClose();
      navigate("/admin");
      return;
    }
    // Check if the email is within the accepted range for students
    if (
      email.match(/^e19\d{3}@eng\.pdn\.ac\.lk$/) ||
      email.match(/^e20\d{3}@eng\.pdn\.ac\.lk$/)
    ) {
      const numberPart = parseInt(email.substring(1, 6), 10); // Extract and convert the numeric part
      if (
        (numberPart >= 19001 && numberPart <= 19110) ||
        (numberPart >= 19112 && numberPart <= 19505) ||
        (numberPart >= 20001 && numberPart <= 20505)
      ) {
        // Adjusted range for students
        setUserToken(decodedUserToken);
        onClose();
        navigate("/");
        return;
      }
    }

    // If neither student nor admin email, show error
    setErrorMessage("You must use a valid @eng.pdn.ac.lk email to login.");
  };

  return (
    <Modal
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
          p="2"
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
            onSuccess={handleLoginSuccess}
            onError={() => {
              onClose();
              console.log("Login Failed");
            }}
          />
          {errorMessage && (
            <Text color="red.500" pt="4">
              {errorMessage}
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
