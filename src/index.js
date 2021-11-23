import './sass/main.scss';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FetchToIP from './js/fetch-photos';
import * as bootstrap from 'bootstrap';
import lozad from 'lozad';

const form = document.querySelector('.search-form');
// const input = document.querySelector('input[type="text"]');
// const button = document.querySelector('button[type="submit"]');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

const fetchToIP = new FetchToIP();

form.addEventListener('submit', handleSubmitOnForm);
loadMoreButton.addEventListener('click', handleLoadMore)

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    nav: true,
    close: true,
  });


let totalHits = 0;

function handleSubmitOnForm(event) {
  event.preventDefault();
  fetchToIP.request = event.currentTarget.elements.searchQuery.value.trim();
  fetchToIP.resetPage();

  if (fetchToIP.request === '') {
    return Notiflix.Notify.warning(`Oops! You need to enter some value`);
  }

  fetchToIP.getFetchPhotos()
    .then(hits => {
      handleClearPhotoConteiner();
      handleAddCreateGallery(hits);
   });
   
}

function handleAddCreateGallery(hits) {
  totalHits += hits.length;
  if (hits.length === 0) {
    return Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`,
    );
  } 
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images for you`);
  createGalleryItems({ hits });
}

function createGalleryItems({hits}) {
    // loading="lazy"
 let photoArray = hits.map(hit => {
    return `<a class="gallery__item" href="${hit.largeImageURL}">
    <div class="photo-card">
<img src="${hit.webformatURL}" alt="${hit.tags}" class="gallery-img"/>
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
      <b class="info-description">Downloads</b>
    <span class="info-number">${hit.downloads}</span>
    </p>
   </div>
  </div>
  </a>`
 }).join('');
  gallery.insertAdjacentHTML('beforeend', photoArray);
  lightbox.refresh();
}

 function handleClearPhotoConteiner() {
  totalHits = 0;
  gallery.innerHTML = '';
}

// const observer = lozad(); 
// const observer = lozad('.lozad', {
//     rootMargin: '10px 0px', // syntax similar to that of CSS Margin
//     threshold: 0.1, // ratio of element convergence
//     enableAutoReload: true // it will reload the new image when validating attributes changes
// });
// observer.observe();

function handleLoadMore(event) {
  // event.preventDefault();
  fetchToIP.getFetchPhotos()
    .then(hits => {
      handleAddCreateGallery(hits);
    });
}