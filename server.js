const express = require("express");
const path = require("path");
// const Groq = require("groq-sdk");

const app = express();
const PORT = 3000;
require("dotenv").config();
const Groq = require("groq-sdk");
const gtts = require("gtts");


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
// 
// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Route for Home Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route for Chat Page
app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "chat.html"));
});

// Route for About Page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});


// Route for Check Components  Page
app.get("/check", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "check.html"));
  });

  app.get("/move", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "move.html"));
  });
  
// API Route for Chat Completion
app.post("/get-chat-completion", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: userMessage }],
      model: "llama-3.3-70b-versatile",
    });

    res.json({ response: chatCompletion.choices[0]?.message?.content || "" });
  } catch (error) {
    res.status(500).json({ error: "Failed to get chat completion", details: error.message });
  }
});

app.get("/speak", async (req, res) => {
  try {
      const userQuestion = req.query.question || "Hello"; // Get the user question from the query string
      console.log("User Question:", userQuestion); // Log the question

      // Fetch the text completion from the model
      const completion = await groq.chat.completions.create({
          messages: [{ role: "user", content: userQuestion }],
          model: "llama-3.3-70b-versatile",
      });

      const text = completion.choices[0]?.message?.content || "No response from AI";
      
      console.log("Text fetched from AI:", text);  // Log the AI's response
      
      // Send the text with proper encoding
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.send(Buffer.from(text, 'utf-8'));

  } catch (error) {
      console.error("Error:", error);  // Log any errors on the server
      res.status(500).send("Error: " + error.message);
  }
});


  

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
