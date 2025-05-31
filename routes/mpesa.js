const express = require('express');
const router = express.Router();

router.post('/validation', (req, res) => {
  console.log('Validation Request:', req.body);

  // Accept all for testing
  res.json({
    ResultCode: '0',
    ResultDesc: 'Accepted',
  });
});

router.post('/confirmation', (req, res) => {
  console.log('Confirmation Received:', req.body);

  res.json({
    ResultCode: '0',
    ResultDesc: 'Success',
  });
});

module.exports = router;
