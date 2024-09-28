// ChatScreen.js
import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenAI API key

const chatbot = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I assist you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chatbot',
        },
      },
    ]);
  }, []);

  const onSend = async (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    const userMessage = newMessages[0].text;

    // Make API request to OpenAI
    try {
      const response = await axios.post(
        API_URL,
        {
          model: 'gpt-3.5-turbo', // or another model
          messages: [{ role: 'user', content: userMessage }],
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botResponse = {
        _id: Math.random(),
        text: response.data.choices[0].message.content,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chatbot',
        },
      };

      setMessages((previousMessages) => GiftedChat.append(previousMessages, [botResponse]));
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: 1, // User ID
      }}
    />
  );
};

export default chatbot;
