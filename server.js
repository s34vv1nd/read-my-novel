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
app.use('/api/books', require('./routes/api/books'));
app.use('/api/library', require('./routes/api/library'));
app.use('/api/genres', require('./routes/api/genres'));
app.use('/api/ratings', require('./routes/api/ratings'));


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

// var express = require('express');
// var app = express();

// var userRouter = express.Router();
// // you need to set mergeParams: true on the router,
// // if you want to access params from the parent router
// var itemRouter = express.Router({mergeParams: true});


// userRouter.route('/')
//     .get(function (req, res) {
//         res.status(200)
//             .send('hello users');
//     });

// userRouter.route('/:userId')
//     .get(function (req, res) {
//         res.status(200)
//             .send('hello user ' + req.params.userId);
//     });

// itemRouter.route('/')
//     .get(function (req, res) {
//         res.status(200)
//             .send('hello items from user ' + req.params.userId);
//     });

// itemRouter.route('/:itemId')
//     .get(function (req, res) {
//         res.status(200)
//             .send('hello item ' + req.params.itemId + ' from user ' + req.params.userId);
//     });
// // you can nest routers by attaching them as middleware:
// userRouter.use('/:userId/items', itemRouter);
// app.use('/user', userRouter);

// app.listen(3003);