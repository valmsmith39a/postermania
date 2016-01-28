$(document).ready(init);

var arrayOfItemsObjectsG = [];
var arrayOfRowContainersObjectsG = [];
var priceTotalG = 0; 

function init(){
	console.log('inside init of main.js');
	$('.items-list').on('click', '.name-col', displayItemDetails);
	$('.items-list').on('click', '.price-col', displayItemDetails); 
	$('.items-list').on('click', '.delete-col', deleteItem);  
	$('.items-list').on('click', '.edit-col', editItem);   
 
	getItems();
}

/* Get items to buy */
function getItems(){
	// AJAX call to app.js, to router file transactions.js, which accesses MongoDB
	$.get('/transactions', function(data) {
			arrayOfItemsObjectsG = data; 
			calculatePriceTotal(); 
			updateArrayOfRowContainers();
			displayRowContainers(); 
   });
}

/* Create item to buy */
function createItem(){
	console.log('inside createItem() in main.js');
	// GET AJAX call to index.js router file to display create item page
	$.get('/createItem', function(data) {

  });

	// In createItem.js, create item button makes POST AJAX call to transactions.js router file
	// to add item created to MongoDB, returns page to main page 
	// Update main.js with get call to items added to buy   
}

function deleteItem(){
	var indexOfItem = $(this).closest('.row-container').index() - 1;
	var itemId = arrayOfItemsObjectsG[indexOfItem]._id;

	$.ajax({
  	method: "DELETE",
 		url: "/transactions/" + itemId
		})
		.done(function(status){
			updateArrayOfRowContainers();
			displayRowContainers();
 		});
}

function editItem(){
	debugger;
	console.log('inside editItem() in main.js');
	var indexOfItem = $(this).closest('.row-container').index() - 1;
	var itemObject = arrayOfItemsObjectsG[indexOfItem]; 
	var itemId = itemObject._id;

	location.href = '/editItem/' + itemId;
  /*
	$.ajax({
  	method: "GET",
 		url: '/editItem/' + itemId,
 		data: itemObject
		})
		.done(function(data, err) {
			debugger;
			//updateArrayOfRowContainers();
			//displayRowContainers();
 		});
 		*/
}

function displayItemDetails(){
	var indexOfItem = $(this).closest('.row-container').index() - 1;
	var itemId = arrayOfItemsObjectsG[indexOfItem]._id;
	//Change this to GET
	location.href = '/itemDetails/' + itemId;
	//location.href = '/itemDetails'+itemId;
}

/* Get items added to cart. May implement as extra feature in future */
function getItemsAddedToCart(){
}

/* Add item to cart. May implement as extra feature in future */
function addItemToCart(){
}

function calculatePriceTotal(){
	console.log('in calculate price total');
	arrayOfItemsObjectsG.map(function(itemObject, index){
		return priceTotalG += itemObject.price*itemObject.quantity; 
	});
}

function updateArrayOfRowContainers(){
	$('.items-list').empty(); 
	arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);

	var $titleRow = $('<tr>').addClass('row-container row-title');
	var $itemTitle = $('<td>').addClass('name-title col-md-3 col-xs-3').text('Item');
	$titleRow.append($itemTitle);
	var $imageTitle = $('<td>').addClass('image-title col-md-3 col-xs-3').text('Image');
	$titleRow.append($imageTitle);
	var $priceTitle = $('<td>').addClass('price-title col-md-3 col-xs-3').text('Price');
	$titleRow.append($priceTitle);
	var $quantityTitle = $('<td>').addClass('quantity-title col-md-3 col-xs-3').text('Quantity');
	$titleRow.append($quantityTitle);
	var $deleteTitle = $('<td>').addClass('delete-title col-md-3 col-xs-3').text('');
	$titleRow.append($deleteTitle);
	var $editTitle = $('<td>').addClass('edit-title col-md-3 col-xs-3').text('');
	$titleRow.append($editTitle);
	arrayOfRowContainersObjectsG.push($titleRow);

	arrayOfItemsObjectsG.map(function(item){
		var $rowContainer = $('<tr>').addClass('row-container row-item');
		var $itemColumn = $('<td>').addClass('name-col col-md-3 col-xs-3').text(item.name); 
    $rowContainer.append($itemColumn); 
    var $imageColumn = $('<img>').addClass('image-col col-md-3 col-xs-3').attr('src', item.image);
		$rowContainer.append($imageColumn);	
    var $priceColumn = $('<td>').addClass('price-col col-md-3 col-xs-3').text('$' + item.price);
		$rowContainer.append($priceColumn);	
		var $quantityColumn = $('<td>').addClass('quantity-col col-md-3 col-xs-3').text(item.quantity);
		$rowContainer.append($quantityColumn);	
		var $deleteColumn = $('<td>').addClass('delete-col col-md-3 col-xs-3').text('Delete');
		$rowContainer.append($deleteColumn);	
		var $editColumn = $('<td>').addClass('edit-col col-md-3 col-xs-3').text('Edit');
		$rowContainer.append($editColumn);				
    arrayOfRowContainersObjectsG.push($rowContainer);
	});
	var $priceTotalRowContainer = $('<tr>').addClass('row-container row-total-price').text('Total: ' + '$' + priceTotalG.toFixed(2));
	arrayOfRowContainersObjectsG.push($priceTotalRowContainer);		
}

function displayRowContainers(){
	//$('.itemsInStore-list').append('<div>test</div>');
	$('.items-list').append(arrayOfRowContainersObjectsG);
	//$('#items-input').val('');
}