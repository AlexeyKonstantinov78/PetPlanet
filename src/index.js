const buttons = document.querySelectorAll('.store__categorry-button');

const changeActiveBtn = (event) => {
  const target = event.target;

  buttons.forEach((button) => {
    button.classList.remove('store__categorry-button_active');
  });

  target.classList.add('store__categorry-button_active');
};

buttons.forEach((button) => {
  button.addEventListener('click', changeActiveBtn);
});