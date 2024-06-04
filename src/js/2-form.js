const formData = {
  email: '',
  message: '',
};

const formElem = document.querySelector('.feedback-form');

formElem.addEventListener('input', e => {
  const inputValue = e.target.value.trim();
  const elemNameAttr = e.target.getAttribute('name');

  formData[elemNameAttr] = inputValue;

  saveToLocalStorage('feedback-form-state', formData);
});

document.addEventListener('DOMContentLoaded', () => {
  const localData = loadFromLocalStorage('feedback-form-state');
  
  if (localData) {
    const { email, message } = localData;

    formData.email = email;
    formData.message = message;
    formElem.elements.email.value = email;
    formElem.elements.message.value = message;
  }
});

formElem.addEventListener('submit', e => {
  e.preventDefault();

  const isFormFilled = formData.email && formData.message;

  if (isFormFilled) {
    console.log(formData);

    localStorage.removeItem('feedback-form-state');

    formData.email = '';
    formData.message = '';

    formElem.reset();
  } else {
    alert('Fill please all fields');
  }
});

function saveToLocalStorage(key, value) {
  const stringifiedValue = JSON.stringify(value);

  localStorage.setItem(key, stringifiedValue);
}

function loadFromLocalStorage(key) {
  const stringifiedValue = localStorage.getItem(key);
  const parsedValue = JSON.parse(stringifiedValue || null);

  return parsedValue;
}
