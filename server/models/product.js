var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var productSchema = new Schema({
  ID:    { type: Number },
  Name:     { type: String },
  Description:  { type: String },
  ReleaseDate:   { type: String },
  DiscontinuedDate:  { type: Object },
  Rating: { type: Number},
  Price: { type: Number}
});

module.exports = productSchema;