const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // Allows your GitHub site to talk to this server
app.use(express.json());

// API Configuration
const HAZEL_KEY = process.env.HAZEL_API_KEY; 

app.post('/api/chat', async (req, res) => {
    try {
        // Professional Algorithm: Forwarding the request to the AI Engine
        const aiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.prompt }]
        }, {
            headers: { 'Authorization': `Bearer ${HAZEL_KEY}` }
        });

        res.json({ reply: aiResponse.data.choices[0].message.content });
    } catch (err) {
        console.error("API Failure:", err.message);
        res.status(500).json({ error: "Communication breakdown with Hazel Core." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Hazel Intelligence active on port ${PORT}`));
