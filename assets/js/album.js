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

  pageContent.append(renderAlbumData(albumData));
  pageContent.append(renderAlbumPhotos(albumData.photos));

  const lightbox = new PhotoSwipeLightbox({
    gallery: '.photo-gallery',
    children: 'a',
    pswpModule: () => PhotoSwipe
  });
  lightbox.init();
}

function renderAlbumData(album) {
  const albumElement = document.createElement('div');
  albumElement.classList.add('album-data');

  const albumHeadingElement = document.createElement('h1');
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

  return albumElement;
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