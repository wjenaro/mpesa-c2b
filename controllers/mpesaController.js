const axios = require('axios');
require('dotenv').config();

exports.validation = (req, res) => {
  console.log('Validation request:', req.body);

  res.json({
    ResultCode: 0,
    ResultDesc: 'Accepted',
  });
};

exports.confirmation = (req, res) => {
  console.log('Confirmation request:', req.body);

  // Store or log transaction info here
  const {
    TransID, TransAmount, MSISDN, FirstName, LastName, BillRefNumber,
  } = req.body;

  console.log(`Received payment from ${FirstName} ${LastName} (${MSISDN}) of KES ${TransAmount}, Ref: ${TransID}`);

  res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
};

exports.registerUrls = async (req, res) => {
  try {
    const token = await generateToken();

    const response = await axios.post(
      `${process.env.MPESA_BASE_URL}/mpesa/c2b/v1/registerurl`,
      {
        ShortCode: process.env.SHORTCODE,
        ResponseType: 'Completed',
        ConfirmationURL: process.env.CONFIRMATION_URL,
        ValidationURL: process.env.VALIDATION_URL,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Registration failed' });
  }
};

async function generateToken() {
  const auth = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString('base64');

  const res = await axios.get(`${process.env.MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  return res.data.access_token;
}
