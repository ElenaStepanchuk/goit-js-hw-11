import './sass/main.scss';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { FetchToIP } from './js/fetch-photos';
import 'simplelightbox/dist/simple-lightbox.min.css';
import * as bootstrap from 'bootstrap';


const form = document.querySelector('.search-form');
const input = document.querySelector('input[type="text"]');
const button = document.querySelector('button[type="submit"]');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more'),

fetchToIP = new FetchToIP();

form.addEventListener('submit', handleSubmitOnForm);
loadMoreButton.addEventListener('click', handleLoadMore);

function handleSubmitOnForm(event) {
    event.preventDefault(event);
    gallery.innerHTML = '';
    fetchToIP.fetch = event.currentTarget.elements.searchQuery.value;
    fetchToIP.resetPage();


fetchToIP.getFetchPhotos()
.then(response => {
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
    checkAmountOfHits();
      return response;
})
    .then(createGalleryItems)
    .then(() => {
      let gallery = new SimpleLightbox('.gallery a');
      
      return gallery;
    })
    form.reset();
 
}


function createGalleryItems({hits}) {
    
    const galleryCreate = hits.map(hit => { 
            return `<a class="gallery__item" href="${hit.largeImageURL}">
    <div class="photo-card">
<img src="${hit.webformatURL}" alt="${hit.tags}" class="gallery-img"loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b class="info-description">Likes</b>
     <span class="info-number">${hit.likes}</span>
    </p>
    <p class="info-item">
      <b class="info-description">Views</b>
    <span class="info-number">${hit.views}</span>
    </p>
    <p class="info-item">
      <b class="info-description">Comments</b>
    <span class="info-number">${hit.comments}</span>
    </p>
    <p class="info-item">
      b class="info-description">Downloads</b>
    <span class="info-number">${hit.downloads}</span>
    </p>
   </div>
  </div>
  </a>`
    }).join('');
    gallery.insertAdjacentHTML('beforeend', galleryCreate);
}

    
   
function handleLoadMore(response) {

  fetchToIP.getFetchPhotos()
    .then(response => {
        checkAmountOfHits();
      return response;
    }).then(createGalleryItems)
    .then(() => {
      let gallery = new SimpleLightbox('.gallery a');
   
      return gallery;
    }).then(() => {
      const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    });
  
}


function checkAmountOfHits() {
  console.log(fetchToIP.totalHits/fetchToIP.hits.length)
  
     if ((response.totalHits/response.hits.length)<=1) {
     loadMoreButton.classList.add('disabled');
      }

        loadMoreButton.classList.remove('disabled');
  }



