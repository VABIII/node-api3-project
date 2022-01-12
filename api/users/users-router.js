const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model')

// The middleware functions also need to be required

const { logger } = require('../middleware/middleware')

const router = express.Router();

router.get('/', logger, (req, res, next) => {
    Users.get()
        .then(users => {
            res.json(users)
        })
        .catch(next)
});

router.get('/:id', logger,(req, res,next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
    const { id } = req.params
    Users.getById(id)
        .then(user => {
            res.json(user)
        })
        .catch(next)
});

router.post('/', logger,(req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
    Users.insert(req.body)
        .then(({id}) => {
            return Users.getById(id)
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(next)
});

router.put('/:id', logger,(req, res,next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
    const { id } = req.params
    const changes = req.body
    Users.update(id, changes)
        .then(({id}) => {
            return Users.getById(id)
    })
        .then(user => {
            res.json(user)
        })
        .catch(next)



});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});





// do not forget to export the router
module.exports = router