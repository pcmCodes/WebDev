// Define a global cart array to store added products
var cart = [];

// Load cart data from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    loadCartData();
    displayCart();
});

function addToCart(button) {
    // Extract product information from the clicked button's data attributes
    var productId = button.getAttribute('data-product-id');
    var productName = button.getAttribute('data-product-name');
    var productPrice = parseFloat(button.getAttribute('data-product-price').replace('R', ''));
    var productImage = button.getAttribute('data-product-image');

    // Check if the product is already in the cart
    var existingProduct = cart.find(product => product.id === productId);

    if (existingProduct) {
        // If the product is already in the cart, increment the quantity
        existingProduct.quantity += 1;
    } else {
        // If the product is not in the cart, add it with a quantity of 1
        var product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1  // New property for quantity
        };

        // Add the product to the cart array
        cart.push(product);
    }

    // Save the updated cart data to localStorage
    saveCartData();
    // Display the updated cart
    displayCart();
}

// Function to display the cart items
function displayCart() {
    var cartList = document.getElementById('cartList');

    // Clear existing content in the cart list
    cartList.innerHTML = '';

    // Loop through the cart array and display each item
    cart.forEach(function (product) {
        var cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // Create elements for product details
        var productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;

        var productName = document.createElement('p');
        productName.textContent = product.name;

        var productPrice = document.createElement('p');
        productPrice.textContent = `Price: R${product.price.toFixed(2)}`;

        var quantityContainer = document.createElement('div');
        quantityContainer.classList.add('quantity-container');

        // Create decrement button
        var decrementButton = document.createElement('button');
        decrementButton.textContent = '<';
        decrementButton.onclick = function () {
            removeQuantityFromCart(product.id);
            displayCart();
        };

        // Display quantity
        var productQuantity = document.createElement('p');
        productQuantity.textContent = product.quantity;

        // Create increment button
        var incrementButton = document.createElement('button');
        incrementButton.textContent = '>';
        incrementButton.onclick = function () {
            addQuantityToCart(product.id);
            displayCart();
        };

        // Append elements to quantity container
        quantityContainer.appendChild(decrementButton);
        quantityContainer.appendChild(productQuantity);
        quantityContainer.appendChild(incrementButton);

        // Append product details and quantity container to the cart item
        cartItem.appendChild(productImage);
        cartItem.appendChild(productName);
        cartItem.appendChild(productPrice);
        cartItem.appendChild(quantityContainer);

        // Append the cart item to the cart list
        cartList.appendChild(cartItem);
    });

    // Calculate and display the total price
    displayTotalPrice();
}

// Function to add quantity to the cart
function addQuantityToCart(productId) {
    // Find the product in the cart
    var existingProduct = cart.find(product => product.id === productId);

    // Check if the product is in the cart
    if (existingProduct) {
        // Increment the quantity
        existingProduct.quantity += 1;
    }

    // Update the cart icon with the total number of items
    updateCartIcon();
}

// Function to save the cart data to localStorage
function saveCartData() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load the cart data from localStorage
function loadCartData() {
    var savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Function to remove quantity from the cart
function removeQuantityFromCart(productId) {
    // ... (implement this function if needed)

    // Save the updated cart data to localStorage
    saveCartData();
    // Display the updated cart
    displayCart();
}

// Function to display the total price
function displayTotalPrice() {
    // ... (implement this function if needed)
}

// Function to update the cart icon with the total number of items
function updateCartIcon() {
    // ... (implement this function if needed)
}

// Additional code you provided
function redirectToPayment() {
    // Calculate the total amount
    var totalAmount = cart.reduce(function (total, product) {
        return total + product.price * product.quantity;
    }, 0);

    // Encode the total amount in the URL
    var encodedTotalAmount = encodeURIComponent(totalAmount.toFixed(2));

    // Redirect to payment.html with the total amount as a query parameter
    window.location.href = 'payment.html?total=' + encodedTotalAmount;
}
