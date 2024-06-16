import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';

interface ChatMessage {
  from: string;
  text: string;
}

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<ChatMessage[]>([]);

  

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const newChat = [...chat, { from: 'user', text: message }];
    setChat(newChat);
    setMessage('');

    try {
      const response = await axios.post<{ response: string }>('http://localhost:5000/api/dialogflow', { message });
      const botMessage = response.data.response;
      setChat([...newChat, { from: 'bot', text: botMessage }]);
    } catch (error) {
      console.error('Error sending message to Dialogflow:', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Box p={4} maxW="600px" mx="auto">
      <VStack spacing={4} align="stretch">
        <Box overflowY="scroll" maxH="400px" p={4} border="1px" borderColor="gray.200" borderRadius="md">
          {chat.map((entry, index) => (
            <Box key={index} alignSelf={entry.from === 'user' ? 'flex-end' : 'flex-start'}>
              <Text
                bg={entry.from === 'user' ? 'blue.100' : 'green.100'}
                p={2}
                borderRadius="md"
                mb={2}
                maxW="80%"
                wordBreak="break-word"
              >
                {entry.text}
              </Text>
            </Box>
          ))}
        </Box>
        <Input
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <Button onClick={sendMessage} bgGradient="linear(to-r, #0F435F, #427F9F)">
          Send
        </Button>
      </VStack>
    </Box>
  );
};

export default Chatbot;
