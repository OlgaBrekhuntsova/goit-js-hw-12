import SimpleLightbox from 'simplelightbox';

const refs = {
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.js-loader'),
};

const gallerySL = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.8,
  captions: true,
  captionsData: 'alt',
  captionDelay: 100,
  captionPosition: 'bottom',
});
gallerySL.on('error.simplelightbox', function (e) {
  console.log(e);
});

export function showLoader() {
  refs.loader.classList.add('active');
}
export function hideLoader() {
  refs.loader.classList.remove('active');
}
export function clearGallery() {
  refs.gallery.innerHTML = '';
}
function galleryCard({
  id,
  webformatURL,
  largeImageURL,
  likes,
  views,
  comments,
  downloads,
  tags,
}) {
  return `<li class="gallery-item" data-id=${id}>
  <a class="gallery-link" href="${largeImageURL}">
  <div class="image-wrapper">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" /></div>
       <ul class='statistics'>
        <li><span class="statistics-label">likes</span><span class="statistics-value">${likes}</span></li>
        <li><span class="statistics-label">views</span><span class="statistics-value">${views}</span></li>
        <li><span class="statistics-label">comments</span><span class="statistics-value">${comments}</span></li>
        <li><span class="statistics-label">downloads</span><span class="statistics-value">${downloads}</span></li>
       </ul>  
    </a>
    </li>`;
}
function galleryCards(images) {
  return images.map(galleryCard).join('');
}

export function createGallery(images) {
  const galleryMarkup = galleryCards(images);
  refs.gallery.innerHTML = galleryMarkup;
  gallerySL.refresh();
}
