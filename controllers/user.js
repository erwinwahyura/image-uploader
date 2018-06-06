const User = require('../models/User')
const uuidv1 = require('uuid/v1');
const errorHandler = require('../helpers/errorHandler')
const requestToken = (req, res, next) => {
    let { 
        name,
        email
    } = req.body

    if (!name || !email)  {
        res.send({error: errorHandler('please fill name and email correctly!')})
    }
        
    User.findOne({ 
       $or: [
           { name },
           { email }
       ]
    }).then(user => {
        if (user === null) {
            let uuid = uuidv1()
            User.create({
                name,
                email,
                uuid
            }, (err, result) => {
                if (err) {
                    res.send({error: errorHandler('error created user')})
                }
                res.send(result)
            })
        }
        res.send(user)
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {
    requestToken
}