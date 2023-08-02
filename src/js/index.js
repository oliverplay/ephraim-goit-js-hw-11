import PixabayApi from './PixabayApi.js';
import photoCard from './photoCard.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import LoadMoreBtn from './LoadMoreBtn.js';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const pixabayApi = new PixabayApi();

const slightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  captionPosition: 'bottom',
});

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', onLoadMore);

function onSubmit(e) {
  e.preventDefault();
  loadMoreBtn.hide();
  const form = e.currentTarget;
  pixabayApi.searchQuery = form.elements.searchQuery.value.trim();

  gallery.innerHTML = '';
  pixabayApi.resetPage();

  if (pixabayApi.searchQuery === '') {
    Notiflix.Notify.failure('The input field must not be empty! Try again');
    return;
  }
  getData();
}

async function getData() {
  try {
    const { hits, totalHits } = await pixabayApi.getResponse();
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (pixabayApi.page === 2) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    hits.map(photoCard);
    slightbox.refresh();

    loadMoreBtn.show();
    form.reset();


  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  try {
    const { hits, totalHits } = await pixabayApi.getResponse();

    const maxPage = Math.ceil(totalHits / pixabayApi.per_page);

    console.log('page: ' + pixabayApi.page - 1);
    if (pixabayApi.page === 2) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    if (pixabayApi.page - 1 === maxPage) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.hide();
      return;
    }

    hits.map(photoCard);
    slightbox.refresh();

    form.reset();

  } catch (error) {
    console.log(error);
  }
}

const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
