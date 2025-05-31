const express = require('express');
const router = express.Router();
const { validation, confirmation, registerUrls } = require('../controllers/mpesaController');

router.post('/validation', validation);
router.post('/confirmation', confirmation);
router.get('/register-urls', registerUrls);

module.exports = router;
