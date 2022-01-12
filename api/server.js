const express = require('express');

const userRouter = require('./users/users-router')

const server = express();

// remember express by default cannot parse JSON in request bodies

server.use(express.json())

server.use('/api/users', userRouter )

// global middlewares and the user's router need to be connected here
const {logger} = require('./middleware/middleware')

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => { // eslint-disable-line
  console.log('disaster!')
  res.status(err.status || 500).json({
    message: `The Horror: ${err.message}`,
  })
})


module.exports = server;
