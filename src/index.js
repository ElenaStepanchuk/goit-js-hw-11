import './sass/main.scss';

import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import debounce from 'lodash.debounce';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[type="text"]');
const button = document.querySelector('button[type="submit"]');

let arrayFoundPhotos = [];
const DEBOUNCE_DELAY = 3000;

console.log(form);
console.log(input);
console.log(button);

form.addEventListener('submit', handleSubmitOnForm)

function handleSubmitOnForm(name) {
    name.preventDefault();
    return fetch(`https://pixabay.com/api/?key=24384103-764a450d164e25b7c6f60e4ce&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)
       .then(response => {
           if (!response.ok) {
                    throw new Error();
               }
           return response.json()
       })
}

input.addEventListener('input', debounce(handleInputPhotoName, DEBOUNCE_DELAY));
button.addEventListener('click', handleClickOnButton);

function handleInputPhotoName(event) {
    event.preventDefault();
    arrayFoundPhotos.push(input.value);
    console.log(arrayFoundPhotos);
}
  

function handleClickOnButton(event) {
    event.preventDefault();
    console.log(arrayFoundPhotos);
}