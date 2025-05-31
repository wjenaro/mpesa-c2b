const axios = require('axios');
require('dotenv').config();

const { CONSUMER_KEY, CONSUMER_SECRET, SHORT_CODE, CONFIRMATION_URL, VALIDATION_URL } = process.env;

console.log('Environment Variables:', {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  SHORT_CODE,
  CONFIRMATION_URL,
  VALIDATION_URL
});
async function getAccessToken() {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: {
      Authorization: `Basic ${auth}`
    }
  });
  return response.data.access_token;
}

async function registerUrls() {
  const token = await getAccessToken();
  const body = {
    ShortCode: SHORT_CODE,
    ResponseType: "Completed",
    ConfirmationURL: CONFIRMATION_URL,
    ValidationURL: VALIDATION_URL
  };

  const response = await axios.post(
    'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl',
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}

module.exports = { registerUrls };
