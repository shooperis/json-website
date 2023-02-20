const actualPage = '/' + location.pathname.split('/').pop();
let actualPageName;

window.addEventListener('DOMContentLoaded', () => {
  let scrollPos = 0;
  const mainNav = document.getElementById('mainNav');
  const headerHeight = mainNav.clientHeight;
  window.addEventListener('scroll', function() {
    const currentTop = document.body.getBoundingClientRect().top * -1;
    if (currentTop < scrollPos) {
      if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
        mainNav.classList.add('is-visible');
      } else {
        mainNav.classList.remove('is-visible', 'is-fixed');
      }
    } else {
      mainNav.classList.remove(['is-visible']);
      if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
        mainNav.classList.add('is-fixed');
      }
    }
    scrollPos = currentTop;
  });
})

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
  navigationElement = document.createElement('nav');
  navigationElement.classList.add('navbar', 'navbar-expand-lg', 'navbar-light');
  navigationElement.id = 'mainNav';
  document.querySelector('body').prepend(navigationElement);

  navContainerElement = document.createElement('div');
  navContainerElement.classList.add('container', 'px-4', 'px-lg-5');
  navigationElement.append(navContainerElement);

  logoHTML = `<a class="navbar-brand" href="index.html">JSON website</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i class="fas fa-bars"></i>
              </button>`;
  navContainerElement.innerHTML = logoHTML;

  navCollapseElement = document.createElement('div');
  navCollapseElement.classList.add('collapse', 'navbar-collapse');
  navCollapseElement.id = 'navbarResponsive';
  navContainerElement.append(navCollapseElement);

  navbarElement = document.createElement('ul');
  navbarElement.classList.add('navbar-nav', 'mx-auto', 'py-4', 'py-lg-0');
  navCollapseElement.append(navbarElement);

  navigationArray.forEach(element => {
    menuItemElement = document.createElement('li');
    menuItemElement.classList.add('nav-item');
    navbarElement.append(menuItemElement);

    menuLinkElement = document.createElement('a');
    menuLinkElement.classList.add('nav-link', 'px-lg-3', 'py-3', 'py-lg-4');

    if (actualPage == element.path) {
      menuLinkElement.classList.add('active');
      actualPageName = element.name;
    }

    menuLinkElement.href = `.${element.path}`;
    menuLinkElement.textContent = element.name;
    menuItemElement.append(menuLinkElement);
  });

  searchFormElement = document.createElement('form');
  searchFormElement.classList.add('d-flex');
  searchFormElement.setAttribute('action', './search.html');
  navCollapseElement.append(searchFormElement);
  searchFormElement.innerHTML = `<input class="form-control form-control-sm me-2" name="keywords" type="search" placeholder="Search" aria-label="Search">
                                  <button class="btn btn-sm btn-success" type="submit">Search</button>`;
}

function header(actualPage, actualPageName) {
  const pagePath = actualPage.split('/').pop().replace('.html', '');
  const pageTitle = document.querySelector('title').textContent;

  headerElement = document.createElement('header');
  headerElement.classList.add('masthead');
  headerElement.style.backgroundImage = `url('./assets/images/${pagePath ? pagePath : 'index'}.jpg')`;
  headerElement.innerHTML = `
    <div class="container position-relative px-4 px-lg-5">
    <div class="row gx-4 gx-lg-5 justify-content-center">
      <div class="col-md-10 col-lg-8 col-xl-7">
        <div class="site-heading">
          <h1>${actualPageName ? actualPageName : pageTitle}</h1>
        </div>
      </div>
    </div>
  </div>`;

  document.querySelector('nav').after(headerElement);
}

function footer() {
  footerElement = document.createElement('footer');
  footerElement.classList.add('border-top');
  footerElement.innerHTML = `
    <div class="container px-4 px-lg-5">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-7">
          <div class="small text-center text-muted fst-italic">Copyright &copy; JSON website 2023</div>
        </div>
      </div>
    </div>`;

  document.querySelector('body').append(footerElement);
}

function setHeadingTitle(titleElements, anotherClass = false) {
  const pageHeading = document.querySelector('.site-heading');

  if (anotherClass) {
    pageHeading.removeAttribute('class');
    pageHeading.classList.add(anotherClass);
  }

  pageHeading.innerHTML = '';
  titleElements.forEach(element => {
    pageHeading.append(element);
  });
}

navigation([
  {name: 'Home', path: '/index.html'}, 
  {name: 'Users', path: '/users.html'}, 
  {name: 'Posts', path: '/posts.html'}, 
  {name: 'Albums', path: '/albums.html'}
]);

header(actualPage, actualPageName);

footer();