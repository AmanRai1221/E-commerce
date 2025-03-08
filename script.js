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

// const addCartButton = document.querySelectorAll('.add-cart');

// addCartButton.forEach(button => {
//   button.addEventListener('click', event => {
//     const productBox = event.target.closest('.pro');
//     addToCart(productBox);
//   });
// });

// const cartContent = document.querySelector('.pro');
// const addToCart = productBox => {
//   const productImgSrc = productBox.querySelector('img').src;
//   const productTitle = productBox.querySelector('.product-title').textContent;
//   const productPrice = productBox.querySelector('.price').textContent;

//   const cartBox = document.createElement('div');
//   cartBox.classList.add('cart-box');
//   cartBox.innerHTML = `
//   < img src = "${productImgSrc}" alt = "" >
//     <div class="des">
//     <span>adidas</span>
//     <h5 class="product-title">${productTitle}</h5>
//     <div class="star">
//     <i class="fa-solid fa-star"></i>
//     <i class="fa-solid fa-star"></i>
//     <i class="fa-solid fa-star"></i>
//     <i class="fa-solid fa-star"></i>
//     <i class="fa-solid fa-star"></i>
//     </div>
//     <h4 class="price">${productPrice}</h4>
//     </div>
//     <a href="#"><i class="fa-solid fa-cart-shopping cart add-cart"></i></a>
//   `;

//   cartContent.appendChild(cartBox);
// };