import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Chatbot from '../components/Chatbot';

const ChatbotPage: React.FC = () => {
  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        Chatbot
      </Text>
      <Chatbot />
    </Box>
  );
};

export default ChatbotPage;
