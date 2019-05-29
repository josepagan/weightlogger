const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const weight = require('./routes/weight');

const app = express();


mongoose.connect('mongodb://localhost/weightlogger')
  .then(() => { console.log('Connected to mongodb'); })
  .catch(() => { console.error('Could not connect to mongodb'); });


app.use(cors())
app.use(express.json());
app.use('/api/weight', weight);

app.get('/', (req, res) => {
  res.send('Welcome to weightlogger');
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
