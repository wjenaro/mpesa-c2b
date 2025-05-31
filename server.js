const express = require('express');
// const bodyParser = require('body-parser');
// const mpesaRoutes = require('./routes/mpesa');

const app = express();
// app.use(bodyParser.json());
// app.use('/api/mpesa', mpesaRoutes);

// app.get('/', (req, res) => {
//   res.send('M-Pesa C2B Sandbox App Running');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
