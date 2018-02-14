var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var locationSchema = new Schema({
  type:     { type: String },
  coordinates: { type: [Number], index: '2dsphere' }
});

module.exports = locationSchema;