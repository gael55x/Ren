const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// For handling JSON input
app.use(express.json());

// Endpoint for chatbot conversation
app.post('/chat', (req, res) => {
  const userInput = req.body.message;

  // Call the Python script and pass the user input
  exec(`python3 chatbot.py ${userInput}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Failed to process input' });
    }
    res.json({ response: stdout.trim() });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
