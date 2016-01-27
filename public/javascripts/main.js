$(document).ready(init);

var arrayOfItemsObjectsG = [];
var arrayOfRowContainersObjectsG = [];

function init(){
	console.log('inside init of main.js');
	getItemsInStore();
}

/* Get items sold in store */
function getItemsInStore(){
	// AJAX call to app.js, to router file transactions.js, which accesses MongoDB
	$.get('/transactions', function(data) {
			//console.log('in getItemsInStore() in main.js. data is type:', typeof data);
			//console.log('in getItemsInStore() in main.js. data is:', data);
			//debugger
			arrayOfItemsObjectsG = data; 
			console.log('array of contacts objects array TYPE ', arrayOfItemsObjectsG);
			updateArrayOfRowContainers();
			displayRowContainers(); 
   });
}

function getItemsAddedToCart(){

}

function updateArrayOfRowContainers(){
	$('.items-list').empty(); 
	arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);

	var $titleRow = $('<tr>').addClass('row row-container');
	var $itemTitle = $('<td>').addClass('name-title col-md-6 col-xs-6').text('Item');
	$titleRow.append($itemTitle);
	var $priceTitle = $('<td>').addClass('price-title col-md-6 col-xs-6').text('Price');
	$titleRow.append($priceTitle);
	arrayOfRowContainersObjectsG.push($titleRow);

	arrayOfItemsObjectsG.map(function(item){
		var $rowContainer = $('<tr>').addClass('row row-container');
		var $itemColumn = $('<td>').addClass('name-col col-md-6 col-xs-6').text(item.name); 
    $rowContainer.append($itemColumn); 
    var $priceColumn = $('<td>').addClass('price-col col-md-6 col-xs-6').text(item.price);
		$rowContainer.append($priceColumn);	
		var $imageColumn = $('<td>').addClass('image-col col-md-6 col-xs-6').attr('img');
		$rowContainer.append($priceColumn);			
    arrayOfRowContainersObjectsG.push($rowContainer);
	});
}

function displayRowContainers(){
	//$('.itemsInStore-list').append('<div>test</div>');
	$('.itemsInStore-list').append(arrayOfRowContainersObjectsG);
	//$('#items-input').val('');
}