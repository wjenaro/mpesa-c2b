const axios = require('axios');

let tokenCache = {
  token: null,
  expiry: null
};

/**
 * Gets an access token from M-Pesa API
 * Tokens are cached for 50 minutes (tokens typically last 1 hour)
 */
const getAccessToken = async () => {
  try {
    // Check if we have a valid cached token
    if (tokenCache.token && tokenCache.expiry && tokenCache.expiry > Date.now()) {
      return tokenCache.token;
    }

    if (!process.env.CONSUMER_KEY || !process.env.CONSUMER_SECRET || !process.env.MPESA_BASE_URL) {
      throw new Error('Missing required environment variables for authentication');
    }

    // Generate basic auth token
    const auth = Buffer.from(
      `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
    ).toString('base64');

    const response = await axios.get(
      `${process.env.MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data.access_token) {
      throw new Error('Invalid response from M-Pesa OAuth API');
    }

    // Cache the token with 50 minutes expiry (tokens typically last 1 hour)
    tokenCache.token = response.data.access_token;
    tokenCache.expiry = Date.now() + (50 * 60 * 1000); // 50 minutes in milliseconds

    return response.data.access_token;
  } catch (error) {
    console.error('Auth Error:', error?.response?.data || error.message);
    throw new Error('Failed to get access token from M-Pesa API');
  }
};

module.exports = getAccessToken;
