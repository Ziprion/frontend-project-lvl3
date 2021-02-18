export default (state, data) => {
  const newState = state;
  const parser = new DOMParser();
  const doc = parser.parseFromString(data.contents, 'text/html');
  const rss = doc.querySelector('rss');
  if (rss === null) {
    newState.errors = 'ALERT! RSS';
    newState.process = 'filling';
    return;
  }
  const titleFeed = doc.querySelector('title');
  const titleFeedText = titleFeed.textContent;
  const currentFeeds = state.feeds.map((feed) => feed.title);
  if (currentFeeds.includes(titleFeedText)) {
    newState.errors = 'same RSS';
    newState.process = 'filling';
    return;
  }
  const descriptionFeed = doc.querySelector('description');
  const descriptionFeedText = descriptionFeed.textContent;
  const items = doc.querySelectorAll('item');
  const postsItem = Array.from(items).reduce((acc, item) => {
    const titleItem = item.querySelector('title');
    const titleItemText = titleItem.textContent;
    const normalTitleItemText = titleItemText.startsWith('<!') ? titleItemText.slice(9, titleItemText.length - 3) : titleItemText;
    const href = item.querySelector('link');
    const hrefText = href.nextSibling.data;
    const description = item.querySelector('description');
    const descriptionText = description.textContent;
    return [...acc, { title: normalTitleItemText, href: hrefText, description: descriptionText }];
  }, []);
  state.feeds.push({ title: titleFeedText, description: descriptionFeedText, posts: postsItem });
  newState.process = 'filling';
  newState.errors = 'ok';
};
