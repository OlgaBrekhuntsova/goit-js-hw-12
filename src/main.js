import { getImagesByQuery, PAGE_SIZE } from './js/pixabay-api';
import errorIcon from './img/x-octagon.svg';

import {
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
  showLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';

let page = 1;
let pages = 0;
let query = '';
const refs = {
  formEle: document.querySelector('.form'),
  loadMoreBtn: document.querySelector('.js-loadMore-btn'),
};

refs.formEle.addEventListener('submit', async e => {
  e.preventDefault();
  clearGallery();

  query = refs.formEle.elements['search-text'].value.trim();
  if (!query) {
    alertToast.show('noSearchParams');
    return;
  }
  showLoader();
  page = 1;
  const data = await getImagesByQuery(query, page);
  const total = data?.total ?? null;
  if (total === null) {
    pages = 0;
    alertToast.show('notExpected');
  } else {
    if (total === 0) {
      pages = 0;
      alertToast.show('notFound');
    } else {
      pages = Math.ceil(data.totalHits / PAGE_SIZE);
      createGallery(data.hits);
    }
  }
  hideLoader();
  updateLoadMoreStatus();
  refs.formEle.reset();
});

refs.loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  const data = await getImagesByQuery(query, page);
  const total = data?.total ?? null;
  if (total === null) {
    pages = 0;
    alertToast.show('notExpected');
  } else {
    if (total === 0) {
      pages = 0;
      alertToast.show('notFound');
    } else {
      createGallery(data.hits);
      scrollAfterRender();
    }
  }
  hideLoader();
  updateLoadMoreStatus();
});

refs.formEle.addEventListener('click', e => {
  if (e.target.nodeName === 'INPUT') {
    alertToast.close();
  }
});

export const alertToast = {
  message: {
    noSearchParams: 'Please fill out input field.',
    notFound:
      'Sorry, there are no images matching your search query. Please, try again!',
    notExpected: "Recived data doesn't have expected structure.",
  },
  show(messageKey) {
    const message = this.message[messageKey]
      ? this.message[messageKey]
      : messageKey;

    iziToast.show({
      message: message,
      position: 'topRight',
      backgroundColor: '#EF4040',
      messageColor: '#ffffff',
      iconUrl: errorIcon,
      timeout: 10000,
      closeOnClick: true,
    });
  },
  close() {
    try {
      iziToast.hide({}, document.querySelector('.iziToast'));
    } catch {}
  },
};

export const infoToast = {
  message: {
    lastPage: "We're sorry, but you've reached the end of search results.",
  },
  show(messageKey) {
    const message = this.message[messageKey]
      ? this.message[messageKey]
      : messageKey;

    iziToast.info({
      message: message,
      position: 'topRight',
      timeout: 10000,
      closeOnClick: true,
    });
  },
  close() {
    try {
      iziToast.hide({}, document.querySelector('.iziToast'));
    } catch {}
  },
};

function updateLoadMoreStatus() {
  if (page < pages) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
    page === pages && infoToast.show('lastPage');
  }
}

function scrollAfterRender() {
  const galleryItem = document.querySelector('.gallery-item');
  if (!galleryItem) return;

  const cardHeight = galleryItem.getBoundingClientRect().height;
  animatedScroll(cardHeight * 2, 800);
}

function animatedScroll(distance, duration = 800) {
  const startY = window.scrollY;
  const startTime = performance.now();

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function animate(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const offset = easeOutQuad(progress);
    window.scrollTo(0, startY + distance * offset);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
