var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var addressSchema = new Schema({
  Street:    { type: String },
  City:     { type: String },
  State:  { type: String },
  ZipCode:   { type: String },
  Country:  { type: String },
  PhoneNumber: { type: String}
});

module.exports = addressSchema;