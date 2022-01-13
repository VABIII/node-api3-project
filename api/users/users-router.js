const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model')
const Post = require('../posts/posts-model')

// The middleware functions also need to be required

const { logger, validateUserId, validateUser, validatePost} = require('../middleware/middleware')

const router = express.Router();

router.get('/', logger, (req, res, next) => {
    Users.get()
        .then(users => {
            res.json(users)
        })
        .catch(next)
});

router.get('/:id', logger, validateUserId, (req, res,next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
    const { id } = req.params
    Users.getById(id)
        .then(user => {
            res.json(user)
        })
        .catch(next)
});

router.post('/', logger, validateUser, (req, res, next) => {
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

router.put('/:id', logger, validateUser, validateUserId, (req, res,next) => {
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

router.delete('/:id', logger, validateUserId, (req, res,next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
    const {id} = req.params

    Users.getById(id)
        .then(user => {
            res.json(user)
            return Users.remove(id)
        })
        .catch(next)


});

router.get('/:id/posts', logger, validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
    const {id} = req.params
    Users.getUserPosts(id)
        .then(posts => {
            res.json(posts)
        })
        .catch(next)



});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
    const{id} = req.params
    const {text} = req.body

    Post.insert({user_id: id, text: text})
        .then(post => {
            res.status(201).json(post)
        })
        .catch(next)
});


// do not forget to export the router
module.exports = router