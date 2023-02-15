async function init() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users?_embed=posts');
  const users = await res.json();

  if (users.length == 0) {
    pageContent.append(printError('Error: No users found.'));
    return;
  }

  const pageContent = document.querySelector('#page-content');
  pageContent.append(getAllUsers(users));
}

function getAllUsers(users) {
  const mainElementWrapper = document.createElement('main');
  mainElementWrapper.classList.add('container-fluid', 'mb-4');

  const mainElementRow = document.createElement('div');
  mainElementRow.classList.add('row', 'justify-content-center');
  mainElementWrapper.append(mainElementRow);

  const mainElementCol = document.createElement('div');
  mainElementCol.classList.add('col-md-10', 'col-lg-8', 'col-xl-7');
  mainElementRow.append(mainElementCol);

  const usersList = document.createElement('ul');
  usersList.classList.add('users-list', 'data-list');
  mainElementCol.append(usersList);

  users.forEach(user => {
    const userItem = document.createElement('li');
    userItem.classList.add('user-item');
    userItem.innerHTML = `<a href="./user.html?id=${user.id}">${user.name} (${user.posts.length})</a>`;

    usersList.append(userItem);
  })

  return mainElementWrapper;
}

init();