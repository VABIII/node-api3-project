const Users = require('../users/users-model')


function logger(req, res, next) {
    console.log(`[${req.method}] ${req.url} ${new Date()}`)
    next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
    try {
        const possibleUserId = await Users.getById(req.params.id)
        if(possibleUserId) {
            req.hub = possibleUserId
            next()
        } else {
            next({status: 404,  message: "user not found"})
        }
    }
    catch (err) {
        next(err)
    }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.name){
      next({status: 400, message: "missing required name field"})
  }
  else {
    next()
  }

}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules


module.exports = {
    logger,
    validateUserId,
    validateUser,
    validatePost
}