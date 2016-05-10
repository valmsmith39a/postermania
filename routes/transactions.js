'use strict';

var express = require('express');
var router = express.Router();
var Item = require('../models/item');

/* GET all items in shopping cart */
router.get('/', function(req, res, next) {
  Item.getAllItems(function(err, items) {
    res.send(items);
  });
});

/* POST add item to shopping cart */
router.post('/', function(req, res, next) {
  Item.addItem(req.body, function(err, item) {
    res.send(item); 
  });
});

/* DELETE delete item in shopping cart */
router.delete('/:itemId', function(req, res, next) {
  Item.delete(req.params.itemId, function(err) {
    res.status(err ? 400:200).send(err||null);
  });
});

/* EDIT edit item in shopping cart */
router.put('/:itemId', function(req, res, next) {
  Item.update(req.body, req.params.itemId, function(err, updatedItem) {
    res.status(err ? 400:200).send(err||updatedItem);
  });
});

module.exports = router;
