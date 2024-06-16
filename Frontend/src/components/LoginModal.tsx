import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Text, Button, useDisclosure } from "@chakra-ui/react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { DUserTokenInterface } from "../models/TokenMoodel";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  setUserToken: (token: DUserTokenInterface | null) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, setUserToken }) => {
  const [loginType, setLoginType] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    const decodedUserToken: DUserTokenInterface = jwt_decode(credentialResponse.credential!);
    setUserToken(decodedUserToken);
    onClose();

    if (loginType === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px) " />
      <ModalContent p="5">
        <ModalHeader display="flex" flexDirection="column" alignItems="center" justifyContent="center" p="2">
          ACES Project Fund Requests
        </ModalHeader>
        <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          {loginType === null ? (
            <>
              <Text pb="4" fontSize="sm">Select login type</Text>
              <Button mb="2" onClick={() => setLoginType("user")}>Login as Student</Button>
              <Button onClick={() => setLoginType("admin")}>Login as Admin</Button>
            </>
          ) : (
            <>
              <Text pb="4" fontSize="sm">You need to login with your eng email</Text>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => {
                  onClose();
                  console.log("Login Failed");
                }}
              />
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
