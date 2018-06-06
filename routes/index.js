const router = require('express').Router()
const img = require('../middlewares/img')
const {
    imgDetail,
    getImage
} = require('../controllers/image')
const { 
    requestToken 
} = require('../controllers/user')

router
    .get('/', (req, res) => {
        res.send('alive')
    })
    .post('/request-token', requestToken)
    .post('/image', img.multer.single('file'), img.sendUploadToGCS, imgDetail)
    .get('/image', getImage)
    

module.exports = router