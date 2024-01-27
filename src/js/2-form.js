const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');
const buttonEl = document.querySelector('button');

formEl.addEventListener('input', onFormInput);

buttonEl.addEventListener('click', e => {
  e.preventDefault();
  const email = formEl.elements.email.value.trim();
  const message = formEl.elements.message.value.trim();
  if (email !== '' && message !== '') {
    const dataObj = {
      email,
      message,
    };
    console.log(dataObj);
  }
  localStorage.removeItem(STORAGE_KEY);
  formEl.reset();
});

function onFormInput(e) {
  const email = formEl.elements.email.value.trim();
  const message = formEl.elements.message.value.trim();

  const dataObj = {
    email,
    message,
  };

  saveToLS(dataObj);
}

function saveToLS(value) {
  const stringifyValue = JSON.stringify(value);
  localStorage.setItem(STORAGE_KEY, stringifyValue);
}

function loadFromLS(key) {
  const parsedValue = localStorage.getItem(key);
  try {
    return JSON.parse(parsedValue);
  } catch (error) {
    return parsedValue;
  }
}

function init() {
  const data = loadFromLS(STORAGE_KEY) || {};
  formEl.elements.message.value = data.message || '';
  formEl.elements.email.value = data.email || '';
}

init();
