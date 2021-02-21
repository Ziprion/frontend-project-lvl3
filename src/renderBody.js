export default (state) => {
  const newState = state;
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
    liElFeed.prepend(h3ElFeed);
    const pElFeed = document.createElement('p');
    pElFeed.textContent = feed.description;
    liElFeed.prepend(pElFeed);
    ulElFeed.prepend(liElFeed);
  });
  const { posts } = state;
  posts.forEach((post) => {
    const liElPost = document.createElement('li');
    liElPost.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
    const aClass = post.status === 'checked' ? 'font-weight-normal' : 'font-weight-bold';
    liElPost.innerHTML = `<a
      href="${post.href}" class="${aClass}"
      data-id="${post.uniq}" target="_blank" rel="noopener noreferrer">${post.title}</a><button
      type="button" class="btn btn-primary btn-sm" data-id="${post.uniq}" data-toggle="modal"
      data-target="#modal">Просмотр</button></li>`;

    // class="font-weight-bold"
    ulElPost.append(liElPost);
  });
  const allItems = document.querySelectorAll('button[data-toggle="modal"]');
  const n = (a) => Number(a);
  allItems.forEach((item) => {
    item.addEventListener('click', () => {
      const currentItem = newState.posts.filter((post) => n(post.uniq) === n(item.dataset.id));
      currentItem[0].status = 'checked';
      const { description } = currentItem[0];
      const { title } = currentItem[0];
      const { uniq } = currentItem[0];
      const link = currentItem[0].href;
      const modal = document.querySelector('.modal');
      const modalTitle = modal.querySelector('.modal-title');
      modalTitle.textContent = title;
      const modalLink = modal.querySelector('.modal-footer > a');
      modalLink.setAttribute('href', `${link}`);
      const modalDescription = modal.querySelector('.modal-body');
      modalDescription.textContent = description;
      const a = document.querySelector(`a[data-id="${uniq}"]`);
      a.classList.remove('font-weight-bold');
      a.classList.add('font-weight-normal');
    });
  });
};
