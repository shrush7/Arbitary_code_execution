// index.js

const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/execute', (req, res) => {
  const userInput = req.body.command;

  // WARNING: This is insecure. Never use user input directly in a command.
  exec(userInput, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.send(`Error: ${error.message}`);
      return;
    }
    console.log(`Output: ${stdout}`);
    res.send(`Output: ${stdout}`);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
