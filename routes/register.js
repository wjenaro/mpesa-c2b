const express = require('express');
const axios = require('axios');
const getAccessToken = require('../services/auth');

const router = express.Router();

router.post('/url', async (req, res) => {
  try {
    const token = await getAccessToken();

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl',
      {
        ShortCode: process.env.SHORT_CODE,
        ResponseType: 'Completed',
        ConfirmationURL: process.env.CONFIRMATION_URL,
        ValidationURL: process.env.VALIDATION_URL,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Register URL error:', error?.response?.data || error.message);
    res.status(500).json({ error: error?.response?.data || error.message });
  }
});

module.exports = router;
