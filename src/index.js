import { API_URL, getStorage, setStorage } from './module/const.js';
import { fetchProductByCategory, fetchProductsListCart } from './module/fetch.js';

const buttons = document.querySelectorAll('.store__category-button');
const productList = document.querySelector('.store__list');
const cartButton = document.querySelector('.store__cart-button');
const cartCnt = document.querySelector('.store__cart-cnt');
const modalOverlay = document.querySelector('.modal-overlay');
const modalСloseButton = document.querySelector('.modal-overlay__close-button');
const cartItemsList = document.querySelector('.modal__cart-items');
const cartTotalPrices = document.querySelector('.modal__cart-prices');

const createProductCard = ({ photoUrl, name, price, id }) => {
  const productCard = document.createElement('li');
  productCard.classList.add('store__item');

  productCard.innerHTML = `
    <article class="store__product product">
      <img class="product__image" src="${API_URL + photoUrl}" alt="${name}" width="368" height="261">
        <h3 class="product__title">${name}</h3>
        <p class="product__price">${price}&nbsp;₽</p>
        <button class="product__button-add-cart" data-id="${id}">Заказать</button>
    </article>
  `;

  return productCard;
};

const renderProducts = (products) => {
  productList.textContent = '';

  products.forEach(product => {
    const productCard = createProductCard(product);
    productList.append(productCard);
  });
};

const changeCategory = async ({ target }) => {
  const category = target.textContent;

  buttons.forEach((button) => {
    button.classList.remove('store__category-button_active');
  });

  target.classList.add('store__category-button_active');

  const products = await fetchProductByCategory(category);
  renderProducts(products);
};

buttons.forEach(async (button) => {
  button.addEventListener('click', changeCategory);

  if (button.classList.contains('store__category-button_active')) {
    const products = await fetchProductByCategory(button.textContent);
    renderProducts(products);
  }
});

const createCartItem = ({ id, name, price, photoUrl }) => {
  const elementProduct = document.createElement('li');
  elementProduct.classList.add('modal__cart-item');
  elementProduct.dataset.id = id;
  elementProduct.innerHTML = `
      <img class="modal__cart-item-image" src="${API_URL + photoUrl}" alt="${name}">
      <h3 class="modal__cart-item-title">${name}</h3>
      <div class="modal__cart-item-count">
        <button class="modal__btn modal__minus">-</button>
        <span class="modal__count">1</span>
        <button class="modal__btn modal__plus">+</button>
      </div>
      <p class="modal__cart-item-price">${price}&nbsp;₽</p>
  `;

  return elementProduct;
};

const cartSummaryPrice = () => {
  cartTotalPrices.textContent = '';

  const productCard = document.querySelectorAll('.modal__cart-item');
  let arrPrice = [];

  productCard.forEach(product => {
    const priceProduct = parseFloat(product.querySelector('.modal__cart-item-price').textContent);
    arrPrice.push(priceProduct);
  });
  const totalPrice = arrPrice.reduce((acc, price) => acc + price, 0);
  cartTotalPrices.innerHTML = `${totalPrice}&nbsp;₽`;
};

const renderCartItems = async () => {
  cartItemsList.textContent = '';
  const cartItems = getStorage();
  if (cartItems.length > 0) {
    const productsCart = await fetchProductsListCart(cartItems);
    productsCart.forEach(item => {
      const listItem = createCartItem(item);
      cartItemsList.append(listItem);
    });
  }
  cartSummaryPrice();
};

cartButton.addEventListener('click', () => {
  modalOverlay.style.display = 'flex';
  renderCartItems();
});

modalOverlay.addEventListener('click', ({ target }) => {
  if (target === modalOverlay || target === modalСloseButton) {
    modalOverlay.style.display = 'none';
  }
});

const updateCartCount = () => {
  const cartItems = getStorage();
  cartCnt.textContent = cartItems.length;
};

updateCartCount();

const addToCart = (productName) => {
  const cartItems = getStorage();
  cartItems.push(productName);
  setStorage(cartItems);

  updateCartCount();
};

productList.addEventListener('click', ({ target }) => {
  if (target.closest('.product__button-add-cart')) {
    const productId = parseInt(target.dataset.id, 10);
    addToCart(productId);
  }
});
