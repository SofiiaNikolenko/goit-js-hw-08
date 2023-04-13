import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInput, 500));

let data = {
    email: ' ',
    message: ' ',
};

populateForm();

// беремо значення з value і записуємо у localStorage
function onInput(evt) {
    data[evt.target.name] = evt.target.value;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

// відправка форми і виведення даних у консоль
function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    console.log(data);
}

// отримання значень з localStorage
function populateForm() {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedData) {
        data = JSON.parse(savedData);
        let { email, message } = form.elements;
        email.value = data.email;
        message.value = data.message;
    };
}