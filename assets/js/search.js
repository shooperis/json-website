async function init() {
  const pageContent = document.querySelector('#page-content');
  const parameterKeywords = getParameter('keywords');
  const parameterIn = getParameter('in');

  const mainElementWrapper = document.createElement('main');
  mainElementWrapper.classList.add('container-fluid', 'mb-4');
  pageContent.append(mainElementWrapper);

  const mainElementRow = document.createElement('div');
  mainElementRow.classList.add('row', 'justify-content-center');
  mainElementWrapper.append(mainElementRow);

  const mainElementCol = document.createElement('div');
  mainElementCol.classList.add('col-md-10', 'col-lg-8', 'col-xl-7');
  mainElementRow.append(mainElementCol);

  const searchForm = document.createElement('form');
  searchForm.classList.add('d-flex');
  searchForm.id = "search-form";
  searchForm.innerHTML = `<div class="input-group me-2">
                            <span class="input-group-text">Keywords</span>
                            <input class="form-control" value="${parameterKeywords ? parameterKeywords : ''}" name="keywords" type="search" placeholder="Search" aria-label="Search">
                          </div>
                          <div class="input-group me-2">
                            <span class="input-group-text">In</span>
                            <select class="form-control" name="in">
                              <option value="all"${parameterIn == 'all' ? ' selected' : ''}>All</option>
                              <option value="posts"${parameterIn == 'posts' ? ' selected' : ''}>Posts</option>
                              <option value="albums"${parameterIn == 'albums' ? ' selected' : ''}>Albums</option>
                              <option value="users"${parameterIn == 'users' ? ' selected' : ''}>Users</option>
                            </select>
                          </div>
                          <button class="btn btn-success" type="submit">Search</button>`;
  mainElementCol.append(searchForm);

  if (!parameterKeywords) {
    return;
  }

  const resultElementWrapper = document.createElement('div');
  resultElementWrapper.classList.add('search-result', 'mt-5');
  mainElementCol.append(resultElementWrapper);

  const resultTitleElementWrapper = document.createElement('h3');
  resultTitleElementWrapper.classList.add('text-center');
  resultTitleElementWrapper.textContent = 'Search result';
  resultElementWrapper.append(resultTitleElementWrapper);

  if (!parameterIn || parameterIn == 'all' || parameterIn == 'posts') {
    resultElementWrapper.append(await searchInPosts(parameterKeywords));
  }

  if (!parameterIn || parameterIn == 'all' || parameterIn == 'albums') {
    resultElementWrapper.append(await searchInAlbums(parameterKeywords));
  }

  if (!parameterIn || parameterIn == 'all' || parameterIn == 'users') {
    resultElementWrapper.append(await searchInUsers(parameterKeywords));
  }
}

async function searchInPosts(parameterKeywords) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?q=' + parameterKeywords);
  posts = await res.json();

  const resultPostsElementWrapper = document.createElement('div');
  resultPostsElementWrapper.classList.add('search-result-in-posts-wrapper', 'mt-4');
  
  const resultPostsTitleElementWrapper = document.createElement('h4');
  resultPostsTitleElementWrapper.textContent = `result in posts (${posts.length} items):`;
  resultPostsElementWrapper.append(resultPostsTitleElementWrapper);

  const resultPostsListElementWrapper = document.createElement('div');
  resultPostsListElementWrapper.classList.add('search-result-in-posts');
  resultPostsElementWrapper.append(resultPostsListElementWrapper);

  posts.forEach(post => {
    resultPostsListElementWrapper.innerHTML += renderSearchResultItem(post.title, `./post.html?id=${post.id}`);
  });

  return resultPostsElementWrapper;
}

async function searchInUsers(parameterKeywords) {
  const res = await fetch('https://jsonplaceholder.typicode.com/users?q=' + parameterKeywords);
  users = await res.json();

  const resultUsersElementWrapper = document.createElement('div');
  resultUsersElementWrapper.classList.add('search-result-in-users-wrapper', 'mt-4');
  
  const resultUsersTitleElementWrapper = document.createElement('h4');
  resultUsersTitleElementWrapper.textContent = `result in users (${users.length} items):`;
  resultUsersElementWrapper.append(resultUsersTitleElementWrapper);

  const resultUsersListElementWrapper = document.createElement('div');
  resultUsersListElementWrapper.classList.add('search-result-in-users');
  resultUsersElementWrapper.append(resultUsersListElementWrapper);

  users.forEach(user => {
    resultUsersListElementWrapper.innerHTML += renderSearchResultItem(user.name, `./user.html?id=${user.id}`);
  });

  return resultUsersElementWrapper;
}

async function searchInAlbums(parameterKeywords) {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums?q=' + parameterKeywords);
  albums = await res.json();

  const resultAlbumsElementWrapper = document.createElement('div');
  resultAlbumsElementWrapper.classList.add('search-result-in-albums-wrapper', 'mt-4');
  
  const resultAlbumsTitleElementWrapper = document.createElement('h4');
  resultAlbumsTitleElementWrapper.textContent = `result in albums (${albums.length} items):`;
  resultAlbumsElementWrapper.append(resultAlbumsTitleElementWrapper);

  const resultAlbumsListElementWrapper = document.createElement('div');
  resultAlbumsListElementWrapper.classList.add('search-result-in-albums');
  resultAlbumsElementWrapper.append(resultAlbumsListElementWrapper);

  albums.forEach(album => {
    resultAlbumsListElementWrapper.innerHTML += renderSearchResultItem(album.title, `./album.html?id=${album.id}`);
  });

  return resultAlbumsElementWrapper;
}

function renderSearchResultItem(title, url) {
  return `<a class="d-block" href="${url}">${title}</a>`;
}

init();