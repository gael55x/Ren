const express = require('express');
const axios = require('axios');  // To make HTTP requests
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint for chatbot conversation
app.post('/chat', async (req, res) => {
  const userInput = req.body.message;

  try {
    // Make a request to the Flask server
    const response = await axios.post('http://localhost:5000/chatbot', { message: userInput });
    res.json(response.data);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: 'Failed to process input' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
