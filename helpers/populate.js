const Image = require('../models/Image')
const errorHandler = require('../helpers/errorHandler')

const populateHandler = (req, res, next, id) => {
    let obj = {}
    if (id) {
        obj = {
            user: id
        }
    }
    Image.find(obj)
    .populate('user')
    .exec()
    .then(img => {
        res.send(img)
    })
    .catch(err => {
        console.log(err)
        res.send({
            error: errorHandler('error get latest data!')
        })
    })
}

module.exports = populateHandler
