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
  const albumsList = document.createElement('div');
  albumsList.classList.add('albums-list');

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

    const albumTitle = document.createElement('h2');
    albumTitle.textContent = `${title} (${photosNumber}), author: ${name}`;
    
    albumItemLink.append(photoElement, albumTitle);
    albumItem.append(albumItemLink);
    
    albumsList.append(albumItem);
  })

  return albumsList;
}

init();