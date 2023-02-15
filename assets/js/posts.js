async function init() {
  const pageContent = document.querySelector('#page-content');
  const parameterUserId = getParameter('user_id');
  let userData;
  let posts;

  if (parameterUserId) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${parameterUserId}?_embed=posts`);
    userData = await res.json();
    posts = userData.posts;
  } else {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_expand=user&_limit=15');
    posts = await res.json();
  }

  if (posts.length == 0) {
    pageContent.append(printError('Error: No posts found.'));
    return;
  }

  if (parameterUserId) {
    pageContent.append(getAuthorName(userData));
    pageContent.append(getAllPosts(posts, false));
  } else {
    pageContent.append(getAllPosts(posts, true));
  }
}

function getAllPosts(posts, showAuthor) {
  const postsList = document.createElement('ul');
  postsList.classList.add('posts-list', 'data-list');

  posts.map(post => {
    const postItem = document.createElement('li');
    postItem.classList.add('post-item');
    
    const postLink = document.createElement('a');
    postLink.textContent = post.title;
    postLink.href = './post.html?id=' + post.id;

    if (showAuthor) {
      const postAuthor = document.createElement('a');
      postAuthor.textContent = `${post.user.name}`;
      postAuthor.href = './user.html?id=' + post.user.id;

      postItem.append(postLink, ' - ', postAuthor);
    } else {
      postItem.append(postLink);
    }

    postsList.append(postItem);
  })

  return postsList;
}

function getAuthorName(user) {
  const headingElement = document.createElement('h1');
  headingElement.classList.add('title');
  headingElement.textContent = `'${user.name}' all posts`;

  return headingElement;
}

init();