import './sass/main.scss';

import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

const form = document.querySelector('.search-form');
const input = document.querySelector('input[type="text"]');
const button = document.querySelector('button[type="submit"]');

console.log(form);
console.log(input);
console.log(button);

form.addEventListener('submit', handleSubmitOnForm)

function handleSubmitOnForm() {
    
}