const express = require('express');
const basicAuth = require('express-basic-auth');
const path = require('path');

const app = express();

const USERNAME = process.env.BUYER_USER || 'icc-buyer';
const PASSWORD = process.env.BUYER_PASS || 'change-me-before-launch';

app.use(basicAuth({
  users: { [USERNAME]: PASSWORD },
  challenge: true,
  realm: 'Industrial Cigar Co - Ownership Opportunity',
}));

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ICC buyer site running on port ${PORT}`);
});
