import dotenv from 'dotenv';
import axios from 'axios';
// server.js (using Node.js built-in modules)
// const http = require('http');
//const axios = require('axios'); // For making HTTP requests
//dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyD6F6rY0FVEUVkAJYnmdW6-2fijMhwn1nw"; // Get API key from environment variables
const GEMINI_API_URL = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'; // Default Gemini URL
const GEMINI_FINAL_URL = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
const CONTENT_TYPE = 'application/json';


const sendMessageToGemini = async (message: string) => {
  try {
    console.log('url:', GEMINI_FINAL_URL);
    const response = await axios.post(GEMINI_FINAL_URL, {
      contents: [{
        parts:[{text: message}]
        }]
       }, {
      headers: {
        'Content-Type': CONTENT_TYPE
      }
    });

    console.log('Gemini response:', response.data.candidates[0].content.parts[0].text);
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    throw error;
  }
};

export { sendMessageToGemini };
