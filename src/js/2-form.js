const formData = {
  email: '',
  message: '',
};

const formElem = document.querySelector('.feedback-form');
const emailElem = formElem.elements.email;
const messageElem = formElem.elements.message;

formElem.addEventListener('input', e => {
  const inputValue = e.target.value;
  const elemNameAttr = e.target.getAttribute('name');

  if (elemNameAttr === 'email') {
    formData.email = inputValue;
    saveToLocalStorage('feedback-form-state', formData);
  } else if (elemNameAttr === 'message') {
    formData.message = inputValue;
    saveToLocalStorage('feedback-form-state', formData);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.length > 0) {
    const localData = loadFromLocalStorage('feedback-form-state');
    formData.email = localData.email;
    formData.message = localData.message;
    emailElem.value = localData.email;
    messageElem.value = localData.message;
  }
});

formElem.addEventListener('submit', e => {
  e.preventDefault();

  const isFilled = formData.email && formData.message;

  if (isFilled) {
    console.log(formData);
    localStorage.removeItem('feedback-form-state');
    formData.email = '';
    formData.value = '';
    emailElem.value = '';
    messageElem.value = '';
  } else {
    alert('Fill please all fields');
  }
});

function saveToLocalStorage(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

function loadFromLocalStorage(key) {
  const json = localStorage.getItem(key);
  const data = JSON.parse(json);
  return data;
}
