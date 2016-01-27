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
			//console.log('array of contacts objects array TYPE ', typeof arrayOfContactsObjectsG);
			updateArrayOfRowContainers();
			displayRowContainers(); 
   });
}

function getItemsAddedToCart(){

}

function updateArrayOfRowContainers(){
	$('.items-list').empty(); 
	arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);

	arrayOfItemsObjectsG.map(function(item){
		var $rowContainer = $('<tr>').addClass('row row-container');
		var $itemColumn = $('<td>').addClass('name-col col-md-6 col-xs-6').text(item.name); 
    $rowContainer.append($itemColumn); 
    var $priceColumn = $('<td>').addClass('price-col col-md-6 col-xs-6').text(item.price);
		$rowContainer.append($priceColumn);		
    arrayOfRowContainersObjectsG.push($rowContainer);
	});
}

function displayRowContainers(){
	$('.itemsInStore-list').append(arrayOfRowContainersObjectsG);
	//$('#items-input').val('');
}