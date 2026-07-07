import express from 'express';
import cors from 'cors'; 
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

// Initialize AI with the correct official SDK instance signature
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const app = express();

app.get('/', (req, res) => {
    res.json({ message: "Tarot Backend Server is running successfully!" });
});

// 1. MIDDLEWARE SETTINGS
app.use(cors()); 
app.use(express.json()); 

// 2. ROUTES
app.post('/api/save-user', async (req, res) => {
  try {
    const userChoices = req.body.choices;
    if (!userChoices || !Array.isArray(userChoices)) {
      return res.status(400).json({ error: "No choices provided by the frontend." });
    }

    console.log("Received choices from frontend:", userChoices);
    const cardListString = userChoices.join(", ");

    // Change Content-Type to text/event-stream to bypass browser buffering completely
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); 
    
    res.flushHeaders(); 

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: `Give a reading of around 100 words for: ${cardListString}. Present it like a mystical fortune teller speaking. Do not include web sources. Do not mention the card names in snake case, just the card names in normal case.`,
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        process.stdout.write(chunk.text);
        res.write(chunk.text); // Flushes out to frontend immediately
      }
    }
    
    res.end(); 

  } catch (error) {
    console.error("Server Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Something went wrong generating the reading." });
    } else {
      res.end();
    }
  }
});
// 3. START THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
