const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const HF_API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";
const HF_API_KEY = process.env.HF_API_KEY; // Ensure this is set in .env

app.post("/chatbot", async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await axios.post(
            HF_API_URL,
            { inputs: userMessage },
            { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Backend Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
