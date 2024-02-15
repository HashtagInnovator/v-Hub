const express = require('express');
const fetchData = require('./index');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());


// API route to fetch data
app.get('/api/data', async (req, res) => {
  try {
    // Call the fetchData function to get data from MongoDB
    const jsonData = await fetchData();

    // Send the fetched data as a response
    res.json(jsonData);
    
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
