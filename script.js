const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));

sidebarClose.addEventListener("click", () => {
  sidebar.classList.add("close", "hoverable");
});
sidebarExpand.addEventListener("click", () => {
  sidebar.classList.remove("close", "hoverable");
});

sidebar.addEventListener("mouseenter", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
});
sidebar.addEventListener("mouseleave", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
});

darkLight.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    document.setI;
    darkLight.classList.replace("bx-sun", "bx-moon");
  } else {
    darkLight.classList.replace("bx-moon", "bx-sun");
  }
});

submenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("show_submenu");
    submenuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show_submenu");
      }
    });
  });
});

if (window.innerWidth < 768) {
  sidebar.classList.add("close");
} else {
  sidebar.classList.remove("close");
}


document.addEventListener("DOMContentLoaded", function () {
  const cartButton = document.getElementById("cart-button");
  const cartContainer = document.getElementById("cart-container");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  let cart = [];

  cartButton.addEventListener("click", function () {
    // Toggle the visibility of the cart container
    if (cartContainer.style.display === "block") {
      cartContainer.style.display = "none";
    } else {
      cartContainer.style.display = "block";
    }
  });

  function updateCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} - $${item.price}`;
      cartItems.appendChild(listItem);
      totalPrice += item.price;
    });

    cartTotal.textContent = totalPrice;
  }

  // Example of adding an item to the cart
  const addItemToCart = (name, price) => {
    cart.push({ name, price });
    updateCart();
  };

  // Call this function when you want to add an item to the cart
  // Example: addItemToCart("Sport Boots", 2392);
});

//chat bot

const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "PASTE-YOUR-API-KEY"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));


var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
 // Function to open the cart tab
 function openCartTab() {
  document.querySelector('.cartTab').style.display = 'block';
  displayCartItems();
}

// Function to close the cart tab
function closeCart() {
  document.querySelector('.cartTab').style.display = 'none';
}

// Function to display cart items
function displayCartItems() {
  // Clear previous cart items
  cartList.innerHTML = '';

  // Display each product in the cart
  products.forEach(product => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
          <p>${product.name}</p>
          <p>$${product.price}</p>
      `;
      cartList.appendChild(cartItem);
  });
}


// Define a global cart array to store added products
// Define a global cart array to store added products
var cart = [];

function addToCart(button) {
    // Extract product information from the clicked button's data attributes
    var productId = button.getAttribute('data-product-id');
    var productName = button.getAttribute('data-product-name');
    var productPrice = parseFloat(button.getAttribute('data-product-price').replace('R', ''));
    var productImage = button.getAttribute('data-product-image');

    saveCartData();
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
}

function saveCartData() {
    // Save the cart data to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
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

// Function to remove quantity from the cart
function removeQuantityFromCart(productId) {
    // Find the product in the cart
    var existingProduct = cart.find(product => product.id === productId);

    // Check if the product is in the cart and has a quantity greater than 1
    if (existingProduct && existingProduct.quantity > 1) {
        // Decrement the quantity
        existingProduct.quantity -= 1;
    } else if (existingProduct && existingProduct.quantity === 1) {
        // If the quantity is 1, remove the entire product from the cart
        removeFromCart(productId);
    }

    // Update the cart icon with the total number of items
    updateCartIcon();
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  // Find the index of the product in the cart
  var productIndex = cart.findIndex(product => product.id === productId);

  // Check if the product is in the cart
  if (productIndex !== -1) {
      // Remove the product from the cart array
      cart.splice(productIndex, 1);

      // Save the updated cart data to localStorage
      saveCartData();
  }
}
  // Update the cart icon with the total number of items
  updateCartIcon();

  // Update the cart list representation
  displayCart();

// Update the cart icon with the total number of items
function updateCartIcon() {
    var cartIcon = document.getElementById('cartTab');
    var cartQuantity = document.querySelector('.quantity');
    cartQuantity.textContent = cart.length;
}
// Function to save cart data to localStorage
function saveCartData() {
  localStorage.setItem('cart', JSON.stringify(cart));
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

// Function to calculate and display the total price
function displayTotalPrice() {
    var totalElement = document.querySelector('.total');

    // Check if the cart array is empty
    if (cart.length === 0) {
        totalElement.textContent = 'Total: R 0.00';
        return;
    }

    // Calculate the total price
    var totalPrice = cart.reduce(function (total, product) {
        return total + product.price * product.quantity;
    }, 0);

    // Display the total price
    totalElement.textContent = 'Total: R ' + totalPrice.toFixed(2);
}

// Function to redirect to the payment page
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

document.addEventListener('DOMContentLoaded', function () {
    loadCartData();  // Load cart data when the page is loaded
    updateCartIcon();
    displayCart();
});

function loadCartData() {
    // Get the cart data from localStorage
    var storedCart = localStorage.getItem('cart');

    // Parse the stored cart data (if any)
    cart = storedCart ? JSON.parse(storedCart) : [];
}







document.addEventListener('DOMContentLoaded', function () {
  // Get all elements with the class 'watch-btn'
  var watchButtons = document.querySelectorAll('.watch-btn');

  // Iterate through each button and add a click event listener
  watchButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      // Find the closest video element within the same recording-session
      var video = this.closest('.recording-session').querySelector('video');

      // Check if the video exists
      if (video) {
        // Play the video
        video.play();
      }
    });
  });
});

// Add this function to your JavaScript code
function redirectToClothing() {
  // Redirect to clothing.html
  window.location.href = 'clothing.html';
}


// Your JavaScript code goes here

function performLogin() {
  // Perform login logic, e.g., check credentials
  // If login is successful, hide loginBox and show userIcon
  document.getElementById('loginBox').style.display = 'none';
  document.getElementById('userIcon').style.display = 'block';

  // You may also want to update the displayed username in accountDetails
  const username = document.getElementById('username').value;
  document.getElementById('accountDetails').innerHTML = `Welcome, ${username}!`;
}


function redirectToLogin() {
  window.location.href = "login.html";
}

