const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDb = require('./config/connectDB');
connectDb()

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.use(express.static("uploads"));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipe', require('./routes/recipe'));

const PORT = process.env.PORT || 5000
var server = app.listen(PORT, () => console.log(`Server running port ${PORT}`))
