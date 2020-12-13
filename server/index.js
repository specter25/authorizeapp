const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config();

const pool = require('./config/db');

// middleware

app.use(cors());
app.use(express.json());

// routes

app.use('/authentication', require('./routes/authroutes'));

app.use('/dashboard', require('./routes/profileroutes'));

app.listen(5000, () => {
  console.log(`Server is starting on port 8000`);
});
