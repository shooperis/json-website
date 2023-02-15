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
}

function renderPostData(post) {
  const postTitle = document.createElement('h1');
  postTitle.classList.add('post-title');
  postTitle.textContent = post.title;

  const postSubTitle = document.createElement('h2');
  postSubTitle.classList.add('post-subtitle');
  postSubTitle.textContent = post.body.substring(0, 50);

  const postMeta = document.createElement('p');
  postMeta.classList.add('post-meta');
  postMeta.textContent = 'Posted by ';

  const postAuthor = document.createElement('a');
  postAuthor.textContent = `${post.user.name}`;
  postAuthor.href = './user.html?id=' + post.user.id;
  postMeta.append(postAuthor);

  setHeadingTitle([postTitle, postSubTitle, postMeta], 'post-heading');

  const postElementWrapper = document.createElement('article');
  postElementWrapper.classList.add('mb-4');

  const postElementRow = document.createElement('div');
  postElementRow.classList.add('row', 'gx-4', 'gx-lg-5', 'justify-content-center');
  postElementWrapper.append(postElementRow);

  const postElementCol = document.createElement('div');
  postElementCol.classList.add('col-md-10', 'col-lg-8', 'col-xl-7');
  postElementRow.append(postElementCol);

  const postElementContent = document.createElement('div');
  postElementContent.classList.add('post-content');
  postElementCol.append(postElementContent);

  const postBodyElement = document.createElement('p');
  postBodyElement.classList.add('text');
  postBodyElement.textContent = post.body;
  postElementContent.append(postBodyElement);

  const postDivider = document.createElement('hr');
  postDivider.classList.add('my-4');
  postElementCol.append(postDivider, renderPostComments(post.comments));

  const postDivider2 = document.createElement('hr');
  postDivider2.classList.add('my-4');
  postElementCol.append(postDivider2, renderOtherPost(post.user));

  return postElementWrapper;
}

function renderPostComments(comments) {
  const postCommentsElement = document.createElement('div');
  postCommentsElement.classList.add('comments');

  const postCommentsHeadingElement = document.createElement('h3');
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

    const postCommentNameElement = document.createElement('h4');
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
  otherPostsElement.innerHTML = `Other '<a href="./user.html?id=${user.id}">${user.name}</a>' posts: `;

  const otherPostsLinkElement = document.createElement('a');
  otherPostsLinkElement.textContent = 'Click Here';
  otherPostsLinkElement.href = './posts.html?user_id=' + user.id;
  otherPostsElement.append(otherPostsLinkElement);

  return otherPostsElement;
}

init();
  