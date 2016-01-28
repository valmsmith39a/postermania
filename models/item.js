'use strict'

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
	name:{type:String, require:true},
	description:{type:String, require:true},
	image:{type:String, require:true},
	price:{type:Number, require:true},
	quantity:{type:Number, require:true}
});

var Item = mongoose.model('Items', itemSchema);

module.exports = Item; 

