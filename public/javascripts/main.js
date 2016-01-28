$(document).ready(init);

var arrayOfItemsObjectsG = [];
var arrayOfRowContainersObjectsG = [];
var originalArrayOfItemsObjectsG = [];
var priceTotalG = 0; 

var arrayOfItemsObjectsSortedByNameG = [];
var arrayOfItemsObjectsSortedByPriceG = [];
var filteredArrayOfItemsG = [];
var sortedByNameFlagG = false; 
var sortedByPriceFlagG = false; 

function init(){
	$('.items-list').on('click', '.name-col', displayItemDetails);
	$('.items-list').on('click', '.price-col', displayItemDetails); 
	$('.items-list').on('click', '.image-col', displayItemDetails); 

	$('.items-list').on('click', '.delete-col', deleteItem);  
	$('.items-list').on('click', '.edit-col', editItem);  

	$('.items-list').on('click', '.name-title', sortByName); 
	$('.items-list').on('click', '.price-title', sortByPrice); 

	$( "#input-text" ).on('keyup', searchByName);

	getItems();
}

function getItems(){
	// AJAX call to app.js, to router file transactions.js, which accesses MongoDB
	$.get('/transactions', function(data){
			arrayOfItemsObjectsG = data.slice();  
			// Keep a copy of original array for sorting 
			originalArrayOfItemsObjectsG = data.slice();
			calculatePriceTotal(); 
			updateArrayOfRowContainers();
			displayRowContainers(); 
   });
}

function deleteItem(){
	var indexOfItem = $(this).closest('.row-container').index() - 1;
	var itemId = arrayOfItemsObjectsG[indexOfItem]._id;

	$.ajax({
  	method: "DELETE",
 		url: "/transactions/" + itemId
		})
		.done(function(status){
			arrayOfItemsObjectsG.splice(indexOfItem,1);
			calculatePriceTotal();
			updateArrayOfRowContainers();
			displayRowContainers();
 		});
}

function editItem(){
	var indexOfItem = $(this).closest('.row-container').index() - 1;
	var itemObject = arrayOfItemsObjectsG[indexOfItem]; 
	var itemId = itemObject._id;

	location.href = '/editItem/' + itemId;
}

function displayItemDetails(){
	var indexOfItem = $(this).closest('.row-container').index() - 1;
	var itemId = arrayOfItemsObjectsG[indexOfItem]._id;
	location.href = '/itemDetails/' + itemId;
}

function calculatePriceTotal(){
	priceTotalG = 0; 
	arrayOfItemsObjectsG.map(function(itemObject, index){
		return priceTotalG += itemObject.price*itemObject.quantity; 
	});
}

function sortByName(){
	if(sortedByNameFlagG === false){
		arrayOfItemsObjectsG = arrayOfItemsObjectsG.sort(function(object1, object2){
			return object1.name.localeCompare(object2.name);
		});
		sortedByNameFlagG = true;
  } else {
  	// .slice() creates a copy of the original array, so it does not change during sort
  	arrayOfItemsObjectsG = originalArrayOfItemsObjectsG.slice();
  	sortedByNameFlagG = false;
  }

	calculatePriceTotal();
	updateArrayOfRowContainers();
	displayRowContainers();
}

function sortByPrice(){
	if(sortedByPriceFlagG === false){
		arrayOfItemsObjectsG = arrayOfItemsObjectsG.sort(function(object1, object2){
			return parseFloat(object1.price) - parseFloat(object2.price);
		});
		sortedByPriceFlagG = true;
  } else {
    // .slice() creates a copy of the original array, so it does not change during sort
  	arrayOfItemsObjectsG = originalArrayOfItemsObjectsG.slice();
  	sortedByPriceFlagG = false;
  }

	calculatePriceTotal();
	updateArrayOfRowContainers();
	displayRowContainers();
}

function searchByName(){
	var text = $('#input-text').val();
	var regex = new RegExp(text, 'gi');

	arrayOfItemsObjectsG = originalArrayOfItemsObjectsG.slice();
	arrayOfItemsObjectsG = arrayOfItemsObjectsG.filter(function(object){
			if(object.name.match(regex) !== null){
				return object;
			}
	});
  calculatePriceTotal();
  updateArrayOfRowContainers();
  displayRowContainers();
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

    var priceStr = String(item.price); 

		if(priceStr.indexOf('.') === -1){
			priceStr = priceStr + '.00'
		}

    var $priceColumn = $('<td>').addClass('price-col col-md-3 col-xs-3').text('$' + priceStr);
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
	$('.items-list').append(arrayOfRowContainersObjectsG);
}