const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Sample user data
const user = {
  full_name: 'John Doe',
  dob: '17091999',
  email: 'john@xyz.com',
  roll_number: 'ABCD123',
};

// POST endpoint
app.post('/bfhl', (req, res) => {
  const inputData = req.body.data;

  // Function to find the highest alphabet
  const findHighestAlphabet = (arr) => {
    const alphabets = arr.filter((char) => /^[A-Za-z]$/.test(char));
    return alphabets.length > 0
      ? [alphabets.sort()[alphabets.length - 1]]
      : [];
  };

  const highest_alphabet = findHighestAlphabet(inputData);

  const response = {
    is_success: true,
    user_id: `${user.full_name}_${user.dob}`,
    email: user.email,
    roll_number: user.roll_number,
    numbers: inputData.filter((char) => /^[0-9]+$/.test(char)),
    alphabets: inputData.filter((char) => /^[A-Za-z]$/.test(char)),
    highest_alphabet: highest_alphabet,
  };

  res.json(response);
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
