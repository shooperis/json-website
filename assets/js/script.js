function getParameter(parameterName) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameterName);
}

function printError(text) {
  errorElement = document.createElement('span');
  errorElement.classList.add('error');
  errorElement.textContent = text;
  return errorElement;
}

function navigation(navigationArray) {
  const actualPage = window.location.pathname;

  headerElement = document.querySelector('.main-header');
  navigationElement = document.createElement('ul');
  navigationElement.classList.add('navigation');
  headerElement.append(navigationElement);

  navigationArray.forEach(element => {
    menuItemElement = document.createElement('li');
    menuItemElement.classList.add('menu-item');
    navigationElement.append(menuItemElement);

    menuLinkElement = document.createElement('a');
    menuLinkElement.classList.add('menu-link');

    if (actualPage == element.path) {
      menuLinkElement.classList.add('active');
    }

    menuLinkElement.href = `.${element.path}`;
    menuLinkElement.textContent = element.name;
    menuItemElement.append(menuLinkElement);
  });
}

navigation([
  {name: 'Home', path: '/index.html'}, 
  {name: 'Users', path: '/users.html'}, 
  {name: 'Posts', path: '/posts.html'}, 
  {name: 'Albums', path: '/albums.html'}
]);