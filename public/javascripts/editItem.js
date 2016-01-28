$(document).ready(init);

function init(){
	$('.save-button').on('click', saveButton);
}

function saveButton (){
	var itemObject = {};

	itemObject.name = $('#name').val();
	itemObject.description = $('#description').val();
	itemObject.image = $('#image').val();
	itemObject.price = parseFloat($('#price').val());
	itemObject.quantity = parseFloat($('#quantity').val());

	var itemId = $('#itemId').data('itemid');

	$.ajax({
  	method: 'PUT',
 		url: '/transactions/' + itemId,
 		data: itemObject
		})
		.done(function(data, status) {
			alert('Your edits have been saved');
 		});
}
