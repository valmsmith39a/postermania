$(document).ready(init);

function init(){
	console.log('inside init of createItem.js');	
	$('#create-item-form').on('submit', createItemBtn);
}

function createItemBtn(){
	// debugger;
	console.log('inside createItemBtn() in createItem.js');
	var name = $('#input-name').val();
	var description = $('#input-description').val();
	var image = $('#input-image').val();
	var price = $('#input-price').val();
	var quantity = $('#input-quantity').val();
	/* 
	name:{type:String, require:true},
	description:{type:String, require:true},
	image:{type:String, require:true},
	price:{type:Number, require:true},
	quantity:{type:Number, require:true}
	*/
	var itemObject={
				name:name,
	  		description:description,
	  		image:image, 
	  		price:parseFloat(price), 
	  		quantity:parseFloat(quantity)
	  	};
	// debugger;
	console.log('item object to post', itemObject);

  $.post('/transactions', itemObject)
	.success(function(data) {
		// debugger;
		console.log('item objected posted', itemObject);
		location.href = '/';
  }).fail(function(err) {
    alert('something went wrong :(')
  });	
}