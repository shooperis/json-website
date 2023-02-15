async function init() {
  const pageContent = document.querySelector('#page-content');
  const parameterId = getParameter('id');

  if (!parameterId) {
    pageContent.append(printError('Error: ID not provided.'));
    return;
  }

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${parameterId}?_embed=posts&_embed=albums`);
  const userData = await res.json();

  if (JSON.stringify(userData) === '{}') {
    pageContent.append(printError('Error: User not found.'));
    return;
  }

  pageContent.append(renderUserData(userData));
  pageContent.append(renderUserPosts(userData.posts));
  pageContent.append(renderUserAlbums(userData.albums));
}

function renderUserData(user) {
  const userInfoElement = document.createElement('div');
  userInfoElement.classList.add('user-data');

  const headingElement = document.createElement('h1');
  headingElement.classList.add('title');
  headingElement.textContent = 'User info';
  userInfoElement.append(headingElement);

  const userNameElement = document.createElement('div');
  userNameElement.classList.add('user-name');
  userNameElement.textContent = `Full name: ${user.name}`;
  userInfoElement.append(userNameElement);

  const userNickNameElement = document.createElement('div');
  userNickNameElement.classList.add('user-nickname');
  userNickNameElement.textContent = `Username: ${user.username}`;
  userInfoElement.append(userNickNameElement);

  const userEmailElement = document.createElement('div');
  userEmailElement.classList.add('user-email');
  userEmailElement.textContent = `Email: ${user.email}`;
  userInfoElement.append(userEmailElement);

  const userPhoneElement = document.createElement('div');
  userPhoneElement.classList.add('user-phone');
  userPhoneElement.textContent = `Phone: ${user.phone}`;
  userInfoElement.append(userPhoneElement);

  const userAddressElement = document.createElement('div');
  userAddressElement.classList.add('user-address');
  userAddressElement.textContent = `Address: ${user.address.street} - ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`;
  userInfoElement.append(userAddressElement);

  const userAddressMapElement = document.createElement('a');
  userAddressMapElement.classList.add('user-address-link');
  userAddressMapElement.textContent = 'Google maps';
  userAddressMapElement.setAttribute('target', '_blank');
  userAddressMapElement.href = `http://www.google.com/maps/place/${user.address.geo.lat},${user.address.geo.lng}`;
  userAddressElement.append(userAddressMapElement);

  const userWebsiteElement = document.createElement('a');
  userWebsiteElement.classList.add('user-website');
  userWebsiteElement.textContent = user.website;
  userWebsiteElement.setAttribute('target', '_blank');
  userWebsiteElement.href = 'http://' + user.website;
  userInfoElement.append(userWebsiteElement);

  const userCompanyElement = document.createElement('div');
  userCompanyElement.classList.add('user-company');
  userCompanyElement.textContent = `Company: ${user.company.name}`;
  userInfoElement.append(userCompanyElement);

  return userInfoElement;
}

function renderUserPosts(posts) {
  const postsListWrapper = document.createElement('div');
  postsListWrapper.classList.add('user-posts');

  const headingElement = document.createElement('h2');
  headingElement.classList.add('title');
  headingElement.textContent = 'User posts';
  postsListWrapper.append(headingElement);

  const postsList = document.createElement('ul');
  postsList.classList.add('posts-list', 'data-list');
  postsListWrapper.append(postsList);

  posts.map(post => {
    const postItem = document.createElement('li');
    postItem.classList.add('post-item');
    
    const postLink = document.createElement('a');
    postLink.textContent = post.title;
    postLink.href = './post.html?id=' + post.id;

    postItem.append(postLink);
    postsList.append(postItem);
  });

  return postsListWrapper;
}

function renderUserAlbums(albums) {
  const albumsListWrapper = document.createElement('div');
  albumsListWrapper.classList.add('user-albums');

  const headingElement = document.createElement('h2');
  headingElement.classList.add('title');
  headingElement.textContent = 'User albums';
  albumsListWrapper.append(headingElement);

  const albumsList = document.createElement('ul');
  albumsList.classList.add('albums-list', 'data-list');
  albumsListWrapper.append(albumsList);

  albums.map(album => {
    const albumItem = document.createElement('li');
    albumItem.classList.add('album-item');
    
    const albumLink = document.createElement('a');
    albumLink.textContent = album.title;
    albumLink.href = './album.html?id=' + album.id;

    albumItem.append(albumLink);
    albumsList.append(albumItem);
  });
  
  return albumsListWrapper;
}

init();
