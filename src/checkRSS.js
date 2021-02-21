import renderBody from './renderBody';

const checkRSS = (state) => {
  const newState = state;
  const currentFeeds = state.feeds;
  if (currentFeeds === null) {
    setTimeout(checkRSS, 5000, state);
    return;
  }
  currentFeeds.forEach((feed) => {
    const currentUrl = feed.url;
    const feedID = feed.id;
    fetch(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(currentUrl)}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'application/xml');
        const items = doc.querySelectorAll('item');
        const postsItem = Array.from(items).reduce((acc, item) => {
          const uniq = newState.uniq + 1;

          newState.uniq = uniq;
          const titleItem = item.querySelector('title');
          const titleItemText = titleItem.textContent;
          const normalTitleItemText = titleItemText.startsWith('<!') ? titleItemText.slice(9, titleItemText.length - 3) : titleItemText;
          const href = item.querySelector('link');
          const hrefText = href.textContent;
          const normalhrefText = hrefText.startsWith('<!') ? hrefText.slice(9, hrefText.length - 3) : hrefText;
          const description = item.querySelector('description');
          const descText = description === null ? normalTitleItemText : description.textContent;
          return [...acc, {
            uniq, id: feedID, title: normalTitleItemText, href: normalhrefText, description: descText, status: 'no checked',
          }];
        }, []);
        const currentPosts = state.posts;
        const currentTitles = currentPosts.filter((post) => post.id === feed.id)
          .map((post) => post.title);
        const newPosts = postsItem.filter((item) => !currentTitles.includes(item.title));
        if (newPosts.length > 0) {
          newState.posts = newPosts.concat(state.posts);

          // newState.posts = newPosts.concat(state.posts);
          renderBody(newState);
        }
      });
  });

  setTimeout(checkRSS, 5000, state);
};
export default checkRSS;
