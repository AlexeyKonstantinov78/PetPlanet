const API_URL = 'https://necessary-cherry-alloy.glitch.me';

const buttons = document.querySelectorAll('.store__category-button');
const productList = document.querySelector('.store__list');
const cartButton = document.querySelector('.store__cart-button');
const cartCnt = document.querySelector('.store__cart-cnt');
const modalOverlay = document.querySelector('.modal-overlay');
const modalСloseButton = document.querySelector('.modal-overlay__close-button');
const cartItemsList = document.querySelector('.modal__cart-items');

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

const fetchProductByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/api/products/category/${category}`)

    if (!response.ok) {
      throw new Error(response.status);
    }

    const products = await response.json();

    renderProducts(products);
  } catch (error) {
    console.error(error);
  }
};

const changeCategory = ({ target }) => {
  const category = target.textContent;

  buttons.forEach((button) => {
    button.classList.remove('store__category-button_active');
  });

  target.classList.add('store__category-button_active');

  fetchProductByCategory(category);
};

buttons.forEach((button) => {
  button.addEventListener('click', changeCategory);

  if (button.classList.contains('store__category-button_active')) {
    fetchProductByCategory(button.textContent);
  }
});

const renderCartItems = () => {
  cartItemsList.textContent = '';
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  cartItems.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = item;

    cartItemsList.append(listItem);
  });

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
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  cartCnt.textContent = cartItems.length;
};

updateCartCount();

const addToCart = (productName) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  cartItems.push(productName);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  updateCartCount();
};

productList.addEventListener('click', ({ target }) => {
  if (target.closest('.product__button-add-cart')) {
    // const id = target.dataset.id;
    // addToCart(id);

    const productCart = target.closest(".store__product");
    const productName = productCart.querySelector(".product__title").textContent;
    addToCart(productName);
  }
});
