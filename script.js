const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  })
}
if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  })
}

// Cart functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart if not exists
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Add to cart buttons event listeners
    for (let i = 1; i <= 16; i++) {
        const btn = document.getElementById(`cbtn${i}`);
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                addToCart(this);
            });
        }
    }

    // Load cart items on cart page
    if (document.getElementById('cart')) {
        loadCartItems();
    }
});

function addToCart(button) {
    const productDiv = button.closest('.pro');
    const product = {
        image: productDiv.querySelector('img').src.split('/').pop(),
        name: productDiv.querySelector('h5').textContent,
        price: productDiv.querySelector('h4').textContent,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart'));
    // Compare both name and image to uniquely identify products
    const existingItem = cart.find(item => 
        item.name === product.name && 
        item.image === product.image
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const tbody = document.querySelector('#cart table tbody');
    tbody.innerHTML = ''; // Clear existing items

    let subtotal = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        const priceNum = parseInt(item.price.replace(/\D/g, ''));
        const rowSubtotal = priceNum * item.quantity;
        subtotal += rowSubtotal;

        row.innerHTML = `
            <td><a href="#" class="remove-item"><i class="fa-regular fa-circle-xmark"></i></a></td>
            <td><img src="img/product/${item.image}"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><input type="number" value="${item.quantity}" min="1" class="quantity-input"></td>
            <td>Rs. ${rowSubtotal}</td>
        `;
        tbody.appendChild(row);
    });

    // Update subtotal
    document.querySelector('#subtotal td:last-child').textContent = `Rs. ${subtotal}`;
    document.querySelector('#subtotal strong:last-child').textContent = `Rs. ${subtotal}`;

    // Add event listeners for quantity changes and remove buttons
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', updateCartItem);
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeCartItem);
    });
}

function updateCartItem(e) {
    const newQuantity = parseInt(e.target.value);
    const row = e.target.closest('tr');
    const itemName = row.querySelector('td:nth-child(3)').textContent;
    
    let cart = JSON.parse(localStorage.getItem('cart'));
    const itemIndex = cart.findIndex(item => item.name === itemName);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems(); // Refresh cart display
    }
}

function removeCartItem(e) {
    e.preventDefault();
    const row = e.target.closest('tr');
    const itemName = row.querySelector('td:nth-child(3)').textContent;
    const itemImage = row.querySelector('td:nth-child(2) img').src.split('/').pop();
    
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => 
        !(item.name === itemName && item.image === itemImage)
    );
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // Refresh cart display
}


// Contact Form Handling