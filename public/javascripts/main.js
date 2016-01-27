$(document).ready(init);

var arrayOfItemsObjectsG = [];
var arrayOfRowContainersObjectsG = [];
var priceTotalG = 0; 

function init(){
	console.log('inside init of main.js');
	$('.items-list').on('click', '.name-col', displayItemDetails);
	$('.items-list').on('click', '.price-col', displayItemDetails);
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

function displayItemDetails(){
	var indexOfItem = $(this).closest('.row-container').index();
	// debugger;
	console.log('index of item is: ', indexOfItem);
	var itemId = arrayOfItemsObjectsG[indexOfItem]._id;
	// debugger;
	console.log('item id is: ', itemId);
	location.href = '/itemDetails' + itemId;
}

/* Get items added to cart. May implement as extra feature in future */
function getItemsAddedToCart(){
}

/* Add item to cart. May implement as extra feature in future */
function addItemToCart(){
	/*
	console.log('in addItemToCart in main.js');
	var itemObject = {};
	itemObject.name = 
	$.post('/transactions', itemObject);
	.success(function(data) {
		location.href = '/';
  }).fail(function(err) {
    alert('something went wrong :(')
  });	
  */
}

function calculatePriceTotal(){
	console.log('in calculate price total');
	// debugger
	arrayOfItemsObjectsG.map(function(itemObject, index){
		// debugger;
		return priceTotalG += itemObject.price; 
	});
}

function updateArrayOfRowContainers(){
	$('.items-list').empty(); 
	arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);
/*
	var $titleRow = $('<tr>').addClass('row row-container');
	var $itemTitle = $('<td>').addClass('name-title col-md-3 col-xs-3').text('Item');
	$titleRow.append($itemTitle);
	var $priceTitle = $('<td>').addClass('price-title col-md-3 col-xs-3').text('Price');
	$titleRow.append($priceTitle);
	var $imageTitle = $('<td>').addClass('image-title col-md-3 col-xs-3').text('Image');
	$titleRow.append($imageTitle);
	var $addTitle = $('<td>').addClass('add-title col-md-3 col-xs-3').text('Image');
	$titleRow.append($imageTitle);

	arrayOfRowContainersObjectsG.push($titleRow);
*/
	
	arrayOfItemsObjectsG.map(function(item){
		var $rowContainer = $('<tr>').addClass('row row-container');
		var $itemColumn = $('<td>').addClass('name-col col-md-3 col-xs-3').text(item.name); 
    $rowContainer.append($itemColumn); 
    var $priceColumn = $('<td>').addClass('price-col col-md-3 col-xs-3').text('$' + item.price);
		$rowContainer.append($priceColumn);	
		var $imageColumn = $('<img>').addClass('image-col col-md-3 col-xs-3').attr('src', item.image);
		$rowContainer.append($imageColumn);	
		var $deleteColumn = $('<td>').addClass('add-col col-md-3 col-xs-3').text('Edit');
		$rowContainer.append($deleteColumn);				
    arrayOfRowContainersObjectsG.push($rowContainer);
	});
	var $priceTotalRowContainer = $('<tr>').addClass('price-total-row').text('Total: ' + '$' + priceTotalG.toFixed(2));
	arrayOfRowContainersObjectsG.push($priceTotalRowContainer);		
}

function displayRowContainers(){
	//$('.itemsInStore-list').append('<div>test</div>');
	$('.items-list').append(arrayOfRowContainersObjectsG);
	//$('#items-input').val('');
}