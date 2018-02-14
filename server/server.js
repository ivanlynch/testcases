//Import modules
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");

//Define resources mapping
app.use('/', express.static(__dirname + "/../"));

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

//Import models and controllers
var models = require('./models/supplier');
var SupplierCtrl = require('./controllers/supplier');

var router = express.Router();

app.use(router);

app.get('/hola', function(request, response){
    response.send("Hola");
});

//API Routes
var api = express.Router();

api.route('/suppliers')
    .get(SupplierCtrl.findAllSuppliers)
    .post(SupplierCtrl.addSupplier);

api.route('/suppliers/:id')
    .get(SupplierCtrl.findById)
    .put(SupplierCtrl.updateSupplier)
    .delete(SupplierCtrl.deleteSupplier);
    
app.use('/api/v1', api);    

mongoose.connect('mongodb://localhost/suppliers', function(error, response){

    if(error){
        console.log("Error: Connecting to database: " + error);
    }else{
        console.log("Conectado a MongoDB");
    }



    app.listen(3000, function(){
        console.log("Servidor corriendo");  
    });

});