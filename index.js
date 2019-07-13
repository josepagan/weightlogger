const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const weight = require('./routes/weights');
const users = require('./routes/users');
const auth = require('./routes/auth');


const app = express();


// mongoose.connect('mongodb://localhost/weightlogger')
mongoose.connect('mongodb://josepagan:qwerty12345@ds121349.mlab.com:21349/weightlogger')
  .then(() => { console.log('Connected to mongodb'); })
  .catch((err) => { console.error('Could not connect to mongodb', err); });


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/weights', weight);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.get('/', (req, res) => {
  res.send('Welcome to weightlogger');
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
