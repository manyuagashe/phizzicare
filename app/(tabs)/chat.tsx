import { Colors } from "@/constants/Colors";

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { sendMessageToGemini } from '@/backend/chatbotapi'; // Import the method from chatbotapi.ts

const App: React.FC = () => {  // Use React.FC for type safety
  const [messages, setMessages] = useState<Message[]>([]); 
  const [userInput, setUserInput] = useState('');
  const [systemInstructions, setSysInstr] = useState<string>("You are a chatbot designed to help patients with their physical therapy exercises. This patient is named John Doe who has an ankle sprain. The exercises given by the physical therapist today are squats, lunges, and push-ups. Don't reiterate the information given to you, just use it to make informed decisions. Be friendly, and refer to John Doe by his first name. Don't give too much advice unless the patient asks specifically for detail. Make your response like a continuation of the conversation between you and the patient. Use the chat history, if there is any, to make your conversation flow better. You will be marked as bot in the chat log(but dont respond with the prefix bot), and the patient will be marked as user (but dont respond with the user inputs). The conversation so far is as follows:"); 

  useEffect(() => {
    const initialMessage: Message = { text: "Hi John! I'm Pedro, a virtual PT designed to help you recover steadily! What can I help you with today?", sender: 'bot' };
    setMessages([initialMessage]);
  }, []);

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    const newUserMessage: Message = { text: userInput, sender: 'user' };
    setMessages([...messages, newUserMessage]);

    try {
      const geminiResponse = await sendMessageToGemini(systemInstructions + userInput); 
      const newBotMessage: Message = { text: geminiResponse, sender: 'bot' };
      setSysInstr(systemInstructions + "user: " + userInput + ", bot: " + geminiResponse + ", ");
      setMessages([...messages, newUserMessage, newBotMessage]);
    } catch (error) {
      const errorBotMessage: Message = { text: 'Error communicating with Gemini API', sender: 'bot' };
      setMessages([...messages, newUserMessage, errorBotMessage ]);
    }

    setUserInput('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={[item.sender === 'user' ? {color: 'white'} : {color: 'black'}]}>{item.text}</Text> 
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={userInput}
          onChangeText={setUserInput}
        />
          <TouchableOpacity style={styles.send} onPress={handleSendMessage} >
            <Text style={{color: 'white'}}>SEND</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ // Type the styles
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0FFF4',
  },
  chatContainer: {
    flex: 1,
  },
  messageBubble: {
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#115c43',
    color: 'white',
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 4 }, // Increased shadow offset height
    shadowOpacity: 0.4, // Increased shadow opacity
    shadowRadius: 6, // Increased shadow radius
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: Colors["light"].surface,
    color: 'black',
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 }, // Increased shadow offset height
    shadowOpacity: 0.4, // Increased shadow opacity
    shadowRadius: 6, // Increased shadow radius
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  send: {
    backgroundColor: '#115c43',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  }
});

export default App;

