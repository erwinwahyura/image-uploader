const Image = require('../models/Image')
const User = require('../models/User')
const errorHandler = require('../helpers/errorHandler')
const populateHandler = require('../helpers/populate')

const imgDetail = (req, res, next) => {
    const uuid = req.headers.authorization
    if (!uuid) {
        res.send({
            error: errorHandler('uuid not found!')
        })
    }
    User
        .findOne({ 
            uuid 
        })
        .then(user => {
            console.log(user)
            Image.findOne({
                user: user._id
            })
            .then(userOnImage => {
                console.log(userOnImage);
                if (userOnImage === null) {
                    Image.create({
                        user: user._id,
                        url: req.file.cloudStoragePublicUrl
                    }, (err, result) => {
                        if (err) {
                            res.send({
                                error: errorHandler('error post image')
                            })
                        }
                        res.send(result)
                    })
                }
                // update image
                Image.update(userOnImage, {
                    $set: { 
                        url: req.file.cloudStoragePublicUrl
                    }
                }, (err, result) => {
                    if (err) {
                        res.send({
                            error: errorHandler('error update image')
                        })
                    }
                    populateHandler(req, res, next, user._id)
                })
            })
            .catch(err => {
                res.send({
                    error: errorHandler('something error')
                })
            })
        })
        .catch(err => {
            res.send({
                error: errorHandler('uuid is not valid!')
            })
        })
}

const getImage = (req, res, next) => {
    const uuid = req.headers.authorization
    if (!uuid) {
        res.send({
            error: errorHandler('uuid not found!')
        })
    }
    populateHandler(req, res, next)
}

module.exports = {
    imgDetail,
    getImage
}