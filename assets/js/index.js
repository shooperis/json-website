async function init() {
  const pageContent = document.querySelector('#page-content');

  const mainElementWrapper = document.createElement('main');
  mainElementWrapper.classList.add('container-fluid', 'mb-4');
  pageContent.append(mainElementWrapper);

  const mainElementRow = document.createElement('div');
  mainElementRow.classList.add('row', 'justify-content-center');
  mainElementWrapper.append(mainElementRow);

  const mainElementCol = document.createElement('div');
  mainElementCol.classList.add('col-lg-10', 'col-xl-8');
  mainElementRow.append(mainElementCol);

  const resPosts = await fetch('https://jsonplaceholder.typicode.com/posts?_sort=id&_order=desc&_limit=1');
  const posts = await resPosts.json();
  const newestPost = posts[0];
  const newestPostUrl = './post.html?id=' + newestPost.id;

  const newPostElement = document.createElement('div');
  newPostElement.classList.add('newest-post');
  newPostElement.innerHTML = `<div class="d-flex align-items-center justify-content-between">
                                <h6 class="mb-0">Newest post</h6>
                                <div>
                                    <a class="text-arrow-icon small" href="./posts.html">
                                        More posts
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </a>
                                </div>
                              </div>
                              <hr class="mt-2 mb-3">
                              <div class="card mb-5">
                                <div class="card-body p-0">
                                    <div class="row g-0">
                                        <div class="col-lg-6 p-5">
                                            <a class="text-dark" href="${newestPostUrl}"><h2>${newestPost.title}</h2></a>
                                            <p>${newestPost.body}</p>
                                            <a class="text-arrow-icon small" href="${newestPostUrl}">
                                                Read more
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                            </a>
                                        </div>
                                        <div class="col-lg-6 align-self-stretch bg-img-cover d-none d-lg-flex" style="background-image: url('https://source.unsplash.com/npxXWgQ33ZQ/1200x800')"></div>
                                    </div>
                                </div>
                              </div>`;
  mainElementCol.append(newPostElement);

  const containerElement = document.createElement('div');
  containerElement.classList.add('row', 'gx-5');
  mainElementCol.append(containerElement);

  const containerLeftElement = document.createElement('div');
  containerLeftElement.classList.add('col-lg-7', 'col-xl-8', 'newest-albums');
  containerElement.append(containerLeftElement);

  containerLeftElement.innerHTML = `<div class="d-flex align-items-center justify-content-between">
                                      <h6 class="mb-0">New albums</h6>
                                      <div>
                                          <a class="text-arrow-icon small" href="./albums.html">
                                              More albums
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                          </a>
                                      </div>
                                    </div>
                                    <hr class="mt-2 mb-3">`;

  const resAlbums = await fetch('https://jsonplaceholder.typicode.com/albums?_embed=photos&_sort=id&_order=desc&_limit=3');
  const albums = await resAlbums.json();

  albums.forEach(album => {
    const albumUrl = './album.html?id=' + album.id;
    let albumPhotosHtml = '';

    album.photos.slice(-5).forEach(photo => {
      albumPhotosHtml += `<img src="${photo.thumbnailUrl}" alt="${photo.title}" class="m-2" width="100">`;
    });
    
    containerLeftElement.innerHTML += `<div class="album">
                                        <a class="text-dark" href="${albumUrl}"><h5 class="mt-0">${album.title}</h5></a>
                                        <div>${albumPhotosHtml}</div>
                                        <a class="text-arrow-icon small" href="${albumUrl}">
                                            Read more
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                        </a>
                                      </div>
                                      <hr class="my-4">`;
  });

  const containerRightElement = document.createElement('div');
  containerRightElement.classList.add('col-lg-5', 'col-xl-4', 'newest-users');
  containerElement.append(containerRightElement);

  const resUsers = await fetch('https://jsonplaceholder.typicode.com/users?_sort=id&_order=desc&_limit=8');
  const users = await resUsers.json();

  let usersPhotosHtml = '';

  users.forEach(user => {
    usersPhotosHtml += `<div class="d-flex align-items-center mb-3">
                          <img class="rounded-circle" src="./assets/images/profile.png" width="40" height="40">
                          <div class="ms-3">
                            <a class="text-dark mb-1" href="./user.html?id=${user.id}">${user.name}</a>
                          </div>
                        </div>`;
  });

  containerRightElement.innerHTML = `<div class="card">
                                      <div class="card-body">
                                        <h6>New Users</h6>
                                        <hr>
                                        ${usersPhotosHtml}
                                      </div>
                                    </div>`;

}

init();