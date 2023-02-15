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
    const titleElement = document.createElement('h1');
    titleElement.textContent = `'${userData.name}' all posts`;
    setHeadingTitle([titleElement]);

    pageContent.append(getAllPosts(posts, false));
  } else {
    pageContent.append(getAllPosts(posts, true));
  }
}

function getAllPosts(posts, showAuthor) {
  const postsContainer = document.createElement('div');
  postsContainer.classList.add('container', 'px-4', 'px-lg-5');

  const postsRow = document.createElement('div');
  postsRow.classList.add('row', 'gx-4', 'gx-lg-5', 'justify-content-center');
  postsContainer.append(postsRow);

  const postsCol = document.createElement('div');
  postsCol.classList.add('col-md-10', 'col-lg-8', 'col-xl-7');
  postsRow.append(postsCol);

  posts.map(post => {
    const postItem = document.createElement('div');
    postItem.classList.add('post-preview');
    
    const postLink = document.createElement('a');
    postLink.href = './post.html?id=' + post.id;
    postItem.append(postLink);

    const postTitle = document.createElement('h2');
    postTitle.classList.add('post-title');
    postTitle.textContent = post.title;
    postLink.append(postTitle);

    const postSubTitle = document.createElement('h3');
    postSubTitle.classList.add('post-subtitle');
    postSubTitle.textContent = post.body.substring(0, 50);
    postLink.append(postSubTitle);

    if (showAuthor) {
      const postMeta = document.createElement('p');
      postMeta.classList.add('post-meta');
      postMeta.textContent = 'Posted by ';
      postItem.append(postMeta);

      const postAuthor = document.createElement('a');
      postAuthor.textContent = `${post.user.name}`;
      postAuthor.href = './user.html?id=' + post.user.id;
      postMeta.append(postAuthor);
    }

    const postDivider = document.createElement('hr');
    postDivider.classList.add('my-4');
    postItem.append(postDivider);

    postsCol.append(postItem);
  })

  return postsContainer;
}

init();