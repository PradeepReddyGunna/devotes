const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo-service:27017/devquotes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Quote = mongoose.model('Quote', { text: String });

app.get('/api/quotes', async (req, res) => {
  const quotes = await Quote.find();
  res.json(quotes);
});

app.post('/api/quotes', async (req, res) => {
  const newQuote = new Quote({ text: req.body.text });
  await newQuote.save();
  res.json(newQuote);
});

app.listen(3001, () => console.log('Backend running on port 3001'));
