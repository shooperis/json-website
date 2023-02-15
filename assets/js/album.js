import PhotoSwipeLightbox from './photoswipe/photoswipe-lightbox.esm.min.js';
import PhotoSwipe from './photoswipe/photoswipe.esm.min.js';

async function init() {
  const pageContent = document.querySelector('#page-content');
  const parameterId = getParameter('id');

  if (!parameterId) {
    pageContent.append(printError('Error: ID not provided.'));
    return;
  }

  const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${parameterId}?_embed=photos&_expand=user`);
  const albumData = await res.json();

  if (JSON.stringify(albumData) === '{}') {
    pageContent.append(printError('Error: Album not found.'));
    return;
  }

  const titleElement = document.createElement('h1');
  titleElement.textContent = albumData.title;
  setHeadingTitle([titleElement]);

  pageContent.append(renderAlbumData(albumData));

  const lightbox = new PhotoSwipeLightbox({
    gallery: '.photo-gallery',
    children: 'a',
    pswpModule: () => PhotoSwipe
  });
  lightbox.init();
}

function renderAlbumData(album) {
  const mainElementWrapper = document.createElement('main');
  mainElementWrapper.classList.add('container-fluid', 'mb-4');

  const mainElementRow = document.createElement('div');
  mainElementRow.classList.add('row', 'justify-content-center');
  mainElementWrapper.append(mainElementRow);

  const mainElementCol = document.createElement('div');
  mainElementCol.classList.add('col-md-10', 'col-lg-8', 'col-xl-7');
  mainElementRow.append(mainElementCol);

  const albumElement = document.createElement('div');
  albumElement.classList.add('album-data');
  mainElementCol.append(albumElement);

  const albumHeadingElement = document.createElement('h2');
  albumHeadingElement.classList.add('title');
  albumHeadingElement.textContent = album.title;
  albumElement.append(albumHeadingElement);

  const albumAuthorWrapperElement = document.createElement('div');
  albumAuthorWrapperElement.classList.add('author-wrapper');
  albumAuthorWrapperElement.textContent = 'Author: ';
  albumElement.append(albumAuthorWrapperElement);

  const albumAuthorElement = document.createElement('a');
  albumAuthorElement.textContent = `${album.user.name}`;
  albumAuthorElement.href = './user.html?id=' + album.user.id;
  albumAuthorWrapperElement.append(albumAuthorElement);

  mainElementCol.append(renderAlbumPhotos(album.photos));

  return mainElementWrapper;
}

function renderAlbumPhotos(photos) {
  const galleryElement = document.createElement('div');
  galleryElement.classList.add('photo-gallery');

  photos.forEach(photo => {
    const photoLinkElement = document.createElement('a');
    photoLinkElement.classList.add('photo-item');
    photoLinkElement.href = photo.url;
    photoLinkElement.setAttribute('target', '_blank');
    galleryElement.append(photoLinkElement);

    const photoImageElement = document.createElement('img');
    photoImageElement.classList.add('photo-item');
    photoImageElement.src = photo.thumbnailUrl;
    photoImageElement.alt = photo.title;
    photoLinkElement.append(photoImageElement);
  });

  return galleryElement;
}

init();