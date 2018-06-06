const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  url: String
}, {
  timestamps: true
})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image