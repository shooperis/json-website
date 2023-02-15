async function init() {
  const pageContent = document.querySelector('#page-content');
  const parameterId = getParameter('id');

  if (!parameterId) {
    pageContent.append(printError('Error: ID not provided.'));
    return;
  }

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${parameterId}?_expand=user&_embed=comments`);
  const postData = await res.json();

  if (JSON.stringify(postData) === '{}') {
    pageContent.append(printError('Error: Post not found.'));
    return;
  }

  pageContent.append(renderPostData(postData));
  pageContent.append(renderPostComments(postData.comments));
  pageContent.append(renderOtherPost(postData.user));
}

function renderPostData(post) {
  const postElement = document.createElement('div');
  postElement.classList.add('post-data');

  const postHeadingElement = document.createElement('h1');
  postHeadingElement.classList.add('title');
  postHeadingElement.textContent = post.title;
  postElement.append(postHeadingElement);

  const postAuthorWrapperElement = document.createElement('div');
  postAuthorWrapperElement.classList.add('author-wrapper');
  postAuthorWrapperElement.textContent = 'Author: ';
  postElement.append(postAuthorWrapperElement);

  const postAuthorElement = document.createElement('a');
  postAuthorElement.textContent = `${post.user.name}`;
  postAuthorElement.href = './user.html?id=' + post.user.id;
  postAuthorWrapperElement.append(postAuthorElement);

  const postBodyElement = document.createElement('p');
  postBodyElement.classList.add('text');
  postBodyElement.textContent = post.body;
  postElement.append(postBodyElement);

  return postElement;
}

function renderPostComments(comments) {
  const postCommentsElement = document.createElement('div');
  postCommentsElement.classList.add('comments');

  const postCommentsHeadingElement = document.createElement('h2');
  postCommentsHeadingElement.classList.add('title');
  postCommentsHeadingElement.textContent = 'Comments';
  postCommentsElement.append(postCommentsHeadingElement);

  const postCommentsListElement = document.createElement('div');
  postCommentsListElement.classList.add('comments-list');
  postCommentsElement.append(postCommentsListElement);

  comments.forEach(comment => {
    const postCommentItemElement = document.createElement('div');
    postCommentItemElement.classList.add('comment-item');
    postCommentsListElement.append(postCommentItemElement);

    const postCommentNameElement = document.createElement('h3');
    postCommentNameElement.classList.add('name');
    postCommentNameElement.textContent = 'Name: ' + comment.name;
    postCommentItemElement.append(postCommentNameElement);

    const postCommentBodyElement = document.createElement('p');
    postCommentBodyElement.classList.add('body');
    postCommentBodyElement.textContent = comment.body;
    postCommentItemElement.append(postCommentBodyElement);

    const postCommentEmailElement = document.createElement('a');
    postCommentEmailElement.classList.add('email');
    postCommentEmailElement.textContent = comment.email;
    postCommentEmailElement.href = `mailto:${comment.email}`;
    postCommentItemElement.append(postCommentEmailElement);
  });

  return postCommentsElement;
}

function renderOtherPost(user) {
  const otherPostsElement = document.createElement('div');
  otherPostsElement.classList.add('other-user-posts');
  otherPostsElement.textContent = `Other '${user.name}' posts: `;

  const otherPostsLinkElement = document.createElement('a');
  otherPostsLinkElement.textContent = 'Click Here';
  otherPostsLinkElement.href = './posts.html?user_id=' + user.id;
  otherPostsElement.append(otherPostsLinkElement);

  return otherPostsElement;
}

init();
  