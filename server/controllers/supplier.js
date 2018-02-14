var mongoose = require('mongoose');
var Supplier  = mongoose.model('Supplier');

//GET - Return all Suppliers
exports.findAllSuppliers = function(request, response) {
	Supplier.find(function(error, suppliers){
	
		if(error){
			response.send(500, error.message);
		}else{
			console.log('GET /Suppliers');
			response.status(200).jsonp({ Suppliers : suppliers, CountSuppliers : suppliers.length});
		}
		
	});
};

//GET - Return a Supplier with specified ID
exports.findById = function(request, response) {

	Supplier.findById(request.params.id, function(error, supplier) {
		
		if(error){
			response.send(500, error.message);
		}else{
			console.log('GET /supplier/' + request.params.id);
			response.status(200).jsonp(supplier);
		}

	});
};

//POST - Insert a new Supplier in the DB
exports.addSupplier = function(request, response) {

	console.log('POST');
	console.log(request.body);

	var supplier = new Supplier({
		ID:       request.body.ID,
		Name: 	  request.body.Name,
		Address:  request.body.Address,
		Location: request.body.Location,
		Products: request.body.Products
	});

	supplier.save(function(error, supplier) {
		
		if(error){
			response.status(500).send(error.message);
		}else{
			response.status(200).jsonp(supplier);
		}

	});
};


//PUT - Update a register already exists
exports.updateSupplier = function(request, response) {
	Supplier.findById(request.params.id, function(error, supplier) {
		supplier.ID        = request.body.ID;
		supplier.Name      = request.body.Name;
		supplier.Address   = request.body.Address;
		supplier.Location  = request.body.Location;
		supplier.Products  = request.body.Products;

		supplier.save(function(error) {
			if(error){
				response.status(500).send(error.message);
			}else{
				response.status(200).jsonp(supplier);
			}
		});

	});
};

//DELETE - Delete a Supplier with specified ID
exports.deleteSupplier = function(request, response) {
	Supplier.findById(request.params.id, function(error, supplier) {
		supplier.remove(function(error) {
			if(error){
				response.status(500).send(error.message);
			}else{
				response.status(200).send();
			}
		})
	});
};