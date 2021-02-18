export default (state) => {
  const countFeeds = state.feeds.length;
  const feedsContainer = document.querySelector('div .feeds');
  const postsContainer = document.querySelector('div .posts');
  feedsContainer.innerHTML = '';
  postsContainer.innerHTML = '';
  if (countFeeds === 0) {
    return;
  }
  const h2ElFeed = document.createElement('h2');
  h2ElFeed.textContent = 'Фиды';
  feedsContainer.appendChild(h2ElFeed);
  const h2ElPost = document.createElement('h2');
  h2ElPost.textContent = 'Посты';
  postsContainer.appendChild(h2ElPost);
  const ulElFeed = document.createElement('ul');
  ulElFeed.classList.add('list-group', 'mb-5');
  feedsContainer.appendChild(ulElFeed);
  const ulElPost = document.createElement('ul');
  ulElPost.classList.add('list-group');
  postsContainer.appendChild(ulElPost);
  const { feeds } = state;
  feeds.forEach((feed) => {
    const liElFeed = document.createElement('li');
    liElFeed.classList.add('list-group-item');
    const h3ElFeed = document.createElement('h3');
    h3ElFeed.textContent = feed.title;
    liElFeed.appendChild(h3ElFeed);
    const pElFeed = document.createElement('p');
    pElFeed.textContent = feed.description;
    liElFeed.appendChild(pElFeed);
    ulElFeed.appendChild(liElFeed);
    const { posts } = feed;
    posts.forEach((post) => {
      const liElPost = document.createElement('li');
      liElPost.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
      liElPost.innerHTML = `<a
      href="${post.href}" class="font-weight-bold"
      data-id="2" target="_blank" rel="noopener noreferrer">${post.title}</a><button
      type="button" class="btn btn-primary btn-sm" data-id="${post.title}" data-toggle="modal"
      data-target="#modal">Просмотр</button></li>`;
      ulElPost.appendChild(liElPost);
    });
  });
};
