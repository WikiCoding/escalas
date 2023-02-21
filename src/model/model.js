const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  data: Array,
  startDate: Date,
  endDate: Date
})

const Model = mongoose.model('mapaescalas', modelSchema);

module.exports = Model;