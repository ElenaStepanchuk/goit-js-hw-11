import './sass/main.scss';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FetchToIP from './js/fetch-photos';


const form = document.querySelector('.search-form');
// const input = document.querySelector('input[type="text"]');
const button = document.querySelector('button[type="submit"]');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

const fetchToIP = new FetchToIP();

loadMoreButton.setAttribute(`disabled`, true);
loadMoreButton.classList.add(`is-hidden`);


button.addEventListener('click', showLoadMoreButton)

function showLoadMoreButton() {
  loadMoreButton.removeAttribute(`disabled`);
  loadMoreButton.classList.remove(`is-hidden`);
}

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





async function handleSubmitOnForm(event) {
  event.preventDefault();
  fetchToIP.request = event.currentTarget.elements.searchQuery.value.trim();
  fetchToIP.resetPage();

  if (fetchToIP.request === '') {
    loadMoreButton.classList.add(`is-hidden`);
    loadMoreButton.setAttribute(`disabled`, true);
    return Notiflix.Notify.warning(`Oops! You need to enter some value`);
  }

  try {
      await fetchToIP.getFetchPhotos(hits => {
      handleClearPhotoConteiner();
      handleAddCreateGallery(hits);
    });
  } catch(error) {
console.log(error)
  }
    
}


// function handleSubmitOnForm(event) {
//   event.preventDefault();
//   fetchToIP.request = event.currentTarget.elements.searchQuery.value.trim();
//   fetchToIP.resetPage();

//   if (fetchToIP.request === '') {
//     loadMoreButton.classList.add(`is-hidden`);
//     loadMoreButton.setAttribute(`disabled`, true);
//     return Notiflix.Notify.warning(`Oops! You need to enter some value`);
//   }

//   fetchToIP.getFetchPhotos()
//     .then(hits => {
//       handleClearPhotoConteiner();
//       handleAddCreateGallery(hits);
//    });
// }


  
 

  
   







function handleAddCreateGallery(hits) {
  totalHits += hits.length;
  if (hits.length === 0) {
    loadMoreButton.classList.add(`is-hidden`);
    loadMoreButton.setAttribute(`disabled`, true);
    return Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`,
    );
  } 
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images for you`);
  createGalleryItems({ hits });
}

function createGalleryItems({hits}) {
   let photoArray = hits.map(hit => {
    return `<a class="gallery__item" href="${hit.largeImageURL}">
    <div class="photo-card" data-infinite-scroll>
<img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" class="gallery-img"/>
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

function handleLoadMore() {
  fetchToIP.getFetchPhotos()
    .then(hits => {
      handleAddCreateGallery(hits);
    }).then(() => scrollToDown()
    )
}

function scrollToDown() {
  const cardHeight = gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight.y * (-6),
    behavior: 'smooth',
  });
}