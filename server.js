const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
  try {
    // Read existing submissions from the JSON file
    let submissions = [];
    const filePath = path.join(__dirname, 'submissions.json');
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      if (fileContent.trim() !== '') {
        submissions = JSON.parse(fileContent);
      }
    }

    // Add the new submission to the array
    submissions.push(req.body);

    // Write the updated submissions array back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

    res.send('Form submission successful.');
  } catch (err) {
    console.error('Error saving form submission:', err);
    res.status(500).send('Internal server error.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
