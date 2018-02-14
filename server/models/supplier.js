var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    addressSchema = require('./address'),
    locationSchema = require('./location'),
    productSchema = require('./product');

var supplierSchema = new Schema({
  ID:    { type: Number },
  Name:     { type: String },
  Address:  addressSchema,
  Location:   [locationSchema],
  Products: [productSchema]
});

module.exports = mongoose.model('Supplier', supplierSchema);