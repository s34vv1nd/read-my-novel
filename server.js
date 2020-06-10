const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const config = require('config');
const PORT = config.get('PORT');

const app = express();

//Connect DB
const connectDB = require('./config/db')
connectDB();

//Init middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/creation', require('./routes/api/creation'));
app.use('/api/browse', require('./routes/api/browse'));
app.use('/api/library', require('./routes/api/library'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
