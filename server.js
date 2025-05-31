const express = require('express');
const dotenv = require('dotenv');
const registerRoutes = require('./routes/register');
const mpesaRoutes = require('./routes/mpesa');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/register', registerRoutes);
app.use('/api/confirmation', mpesaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
