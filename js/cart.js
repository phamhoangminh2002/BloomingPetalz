// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
// =============================
// Private methods and propeties
// =============================
cart = [];

// Constructor
function Item(name, price, count) {
  this.name = name;
  this.price = price;
  this.count = count;
}

// Save cart
function saveCart() {
  sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}

  // Load cart
function loadCart() {
  cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
}
if (sessionStorage.getItem("shoppingCart") != null) {
  loadCart();
}


// =============================
// Public methods and propeties
// =============================
var obj = {};

//*****  Add to cart ******** 
obj.addItemToCart = function(name, price, count) {
  for(var i in cart) {
    if(cart[i].name === name) {
      cart[i].count ++;
      saveCart();
      return;
    }
  }
  var item = new Item(name, price, count);
  cart.push(item);
  saveCart();
}
//***** Set count from item ********//
obj.setCountForItem = function(name, count) {
  for(var i in cart) {
    if (cart[i].name === name) {
      cart[i].count = count;
      break;
    }
  }
};
//************ Remove item from cart **************//
obj.removeItemFromCart = function(name) {
    for(var i in cart) {
      if(cart[i].name === name) {
        cart[i].count --;
        if(cart[i].count === 0) {
          cart.splice(i, 1);
        }
        break;
      }
  }
  saveCart();
}

// ********** Remove all items from cart ***********//
obj.removeItemFromCartAll = function(name) {
  for(var i in cart) {
    if(cart[i].name === name) {
      cart.splice(i, 1);
      break;
    }
  }
  saveCart();
}

// *********** Clear cart ********//
obj.clearCart = function() {
  cart = [];
  saveCart();
}

// **** *Count cart *****//
obj.totalCount = function() {
  var totalCount = 0;
  for(var i in cart) {
    totalCount += cart[i].count;
  }
  return totalCount;
}

// ****** Total cart *******//
obj.totalCart = function() {
  var totalCart = 0;
  for(var i in cart) {
    totalCart += cart[i].price * cart[i].count;
  }
  return Number(totalCart);
}
// **** List cart ******//
obj.listCart = function() {
  var cartCopy = [];
  for(i in cart) {
    item = cart[i];
    itemCopy = {};
    for(p in item) {
      itemCopy[p] = item[p];

    }
    itemCopy.total = Number(item.price * item.count);
    cartCopy.push(itemCopy)
  }
  return cartCopy;
}
return obj;
})();

  
// ********Add item and show alert cart-modal cart************//
var cartIcon = document.querySelector("#cartIcon");
var modal = document.querySelector("#cart");
var btnx = document.querySelector("#btnX");
var overlay = document.querySelector(".overlay");
  cartIcon.onclick = () => {
    modal.style.display="block";
    overlay.style.display="block";
  }
  btnx.onclick = function(){
    modal.style.display= "none";
    overlay.style.display="none";
  }
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });

// ******Clear items********//
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
}); 

  //******* Display in modal cart/
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = `<tr>
                    <th>Name flower</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th> </th>
                    <th>Total</th>
                  </tr>`;
    for(var i in cartArray) {
      output += `<tr>
                <td>${cartArray[i].name}</td>
                <td>${cartArray[i].price}$</td>
                <td><div class='input-group'>
                    <span class='minus-item' data-name="${cartArray[i].name}"><i class="fa-solid fa-minus"></i></span>
                    <input type='number' class='item-count form-control' data-name="${cartArray[i].name}" value="${cartArray[i].count}">
                    <span class='plus-item ' data-name="${cartArray[i].name}"><i class="fa-solid fa-plus"></i></span></div></td>
                <td><button class='delete-item' data-name="${cartArray[i].name}">X</button></td>
                <td>${cartArray[i].total}$</td>
                </tr>`
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  
  //****** Delete item button**********/
  $('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name');
    alert("Delete " + name);
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name');
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name');
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  //*********Item count input**************//
  $('.show-cart').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();
  