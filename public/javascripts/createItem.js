$(document).ready(init);

function init(){
	$('#create-item-form').on('submit', createItemBtn);
}

function createItemBtn(){
	var name = $('#input-name').val();
	var description = $('#input-description').val();
	var image = $('#input-image').val();
	var price = $('#input-price').val();
	var quantity = $('#input-quantity').val();
	
	var itemObject={
				name:name,
	  		description:description,
	  		image:image, 
	  		price:parseFloat(price), 
	  		quantity:parseFloat(quantity)
	  	};

  $.post('/transactions', itemObject)
	.success(function(data) {
		location.href = '/';
  }).fail(function(err) {
    alert('something went wrong :(')
  });	
}