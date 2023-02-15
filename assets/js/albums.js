async function init() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_limit=30');
  const albums = await res.json();

  if (albums.length == 0) {
    pageContent.append(printError('Error: No albums found.'));
    return;
  }

  const pageContent = document.querySelector('#page-content');
  pageContent.append(getAllAlbums(albums));
}

function getAllAlbums(albums) {
  const mainElementWrapper = document.createElement('main');
  mainElementWrapper.classList.add('container-fluid', 'mb-4');

  const mainElementRow = document.createElement('div');
  mainElementRow.classList.add('row', 'justify-content-center');
  mainElementWrapper.append(mainElementRow);

  const mainElementCol = document.createElement('div');
  mainElementCol.classList.add('col-md-10', 'col-lg-8', 'col-xl-7');
  mainElementRow.append(mainElementCol);

  const albumsList = document.createElement('div');
  albumsList.classList.add('albums-list');
  mainElementCol.append(albumsList);

  albums.map(album => {
    const title = album.title;
    const name = album.user.name;
    const photosNumber = album.photos.length;
    const randomIndex = Math.floor(Math.random() * album.photos.length);
    const randomPhoto = album.photos[randomIndex];

    const albumItem = document.createElement('div');
    albumItem.classList.add('album-item');

    const albumItemLink = document.createElement('a');
    albumItemLink.href = './album.html?id=' + album.id;

    const photoElement = document.createElement('img');
    photoElement.src = randomPhoto.thumbnailUrl;
    photoElement.title = randomPhoto.title;
    albumItemLink.append(photoElement);

    const photoTextWrapper = document.createElement('div');
    photoTextWrapper.classList.add('album-text');
    albumItemLink.append(photoTextWrapper);

    const albumTitle = document.createElement('h3');
    albumTitle.textContent = `${title} (${photosNumber})`;
    photoTextWrapper.append(albumTitle);

    const albumAuthor = document.createElement('span');
    albumAuthor.textContent = `author: ${name}`;
    photoTextWrapper.append(albumAuthor);
    
    albumItem.append(albumItemLink);
    albumsList.append(albumItem);
  })

  return mainElementWrapper;
}

init();