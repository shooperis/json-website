async function init() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_expand=user&_limit=15');
  const posts = await res.json();

  if (posts.length == 0) {
    pageContent.append(printError('Error: No posts found.'));
    return;
  }

  const pageContent = document.querySelector('#page-content');
  pageContent.append(getAllPosts(posts));
}

function getAllPosts(posts) {
  const postsList = document.createElement('ul');
  postsList.classList.add('posts-list', 'data-list');

  posts.map(post => {
    const postItem = document.createElement('li');
    postItem.classList.add('post-item');
    
    const postLink = document.createElement('a');
    postLink.textContent = post.title;
    postLink.href = './post.html?id=' + post.id;

    const postAuthor = document.createElement('a');
    postAuthor.textContent = `${post.user.name}`;
    postAuthor.href = './user.html?id=' + post.user.id;

    postItem.append(postLink, ' - ', postAuthor);

    postsList.append(postItem);
  })

  return postsList;
}

init();