const mongoose = require('mongoose')

const ViewPointsSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  viewpointName: {
    type: String,
    unique: true,
    required: true,
    maxlength: [50, 'A név nem tartalmazhat 30 karakternél többet!'],
  },
  mountain: {
    type: String,
    unique: true,
    required: true,
    maxlength: [50, 'A név nem tartalmazhat 30 karakternél többet!'],
  },
 
  height: {
    type: Number,
    min: [1, 'Egy kilatonak legalabb egy meter magasnak kell lennie!'],
  },
  description: {
    type: String,
    required: true,
  },
  built: {
    type: Date,
    max: [Date.now(), 'Az ektualis datumot nem haladhatja meg!'],
  },
  imageUrl: {
    type: String,
    default: 'http://elit.jedlik.eu/viewpoints/no-img.jpg'
  },
  location: {
    type: Number,
    required: true,
    ref: 'locationsModel',
  },
})

module.exports = mongoose.model('ViewPointsModel', ViewPointsSchema, 'viewpoints')
