
import React from 'react';
import { Box, ChakraProvider, Text } from '@chakra-ui/react';
import Chatbot from '../components/Chatbot';
import Header from '../components/Header';
import Footer from '../components/FooterSection';

const ChatbotPage: React.FC = () => {
  return (
    <ChakraProvider>
      <Header />
      <Box minH="100vh" pt="4" pb="20"> {/* Add padding to avoid overlap with fixed footer */}
        <Chatbot />
      </Box>
      <Footer />
    </ChakraProvider>
  );
};

export default ChatbotPage;


