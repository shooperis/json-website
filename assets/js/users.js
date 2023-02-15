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
  const usersList = document.createElement('ul');
  usersList.classList.add('users-list', 'data-list');

  users.forEach(user => {
    const userItem = document.createElement('li');
    userItem.classList.add('user-item');
    userItem.innerHTML = `<a href="./user.html?id=${user.id}">${user.name} (${user.posts.length})</a>`;

    usersList.append(userItem);
  })

  return usersList;
}

init();