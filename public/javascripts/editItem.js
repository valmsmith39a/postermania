$(document).ready(init);

function init(){
	console.log('in init of editItem.js');
	$('.save-button').on('click', saveButton);
}

function saveButton (){
	var itemObject = {};
	debugger;

	console.log('name is: ', $('#name').val());

	itemObject.name = $('#name').val();
	itemObject.description = $('#description').val();
	itemObject.image = $('#image').val();
	itemObject.price = parseFloat($('#price').val());
	itemObject.quantity = parseFloat($('#quantity').val());

	var itemId = $('#itemId').data('itemid');
	debugger
	console.log('item id is', itemId); 
		console.log('item id is', typeof itemId); 


	$.ajax({
  	method: 'PUT',
 		url: '/transactions/' + itemId,
 		data: itemObject
		})
		.done(function(data, err) {
			debugger;
			console.log('data', data);
			console.log('err', err);
 		});
}
