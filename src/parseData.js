export default (state, data, urlRSS) => {
  const newState = state;
  const parser = new DOMParser();
  const doc = parser.parseFromString(data.contents, 'application/xml');
  const rss = doc.querySelector('rss');
  if (rss === null) {
    newState.errors = 'ALERT! RSS';
    newState.process = 'filling';
    return;
  }
  const titleFeed = doc.querySelector('title');
  const titleFeedText = titleFeed.textContent;
  const linkFeed = urlRSS;
  const currentFeeds = state.feeds.map((feed) => feed.title);
  if (currentFeeds.includes(titleFeedText)) {
    newState.errors = 'same RSS';
    newState.process = 'filling';
    return;
  }
  const feedID = currentFeeds.length + 1;
  const descriptionFeed = doc.querySelector('description');
  const descriptionFeedText = descriptionFeed.textContent;
  state.feeds.push({
    title: titleFeedText, url: linkFeed, description: descriptionFeedText, id: feedID,
  });
  const items = doc.querySelectorAll('item');
  const postsItem = Array.from(items).reduce((acc, item) => {
    const uniq = state.uniq + 1;
    newState.uniq = uniq;
    const itemID = feedID;
    const titleItem = item.querySelector('title');
    const titleItemText = titleItem.textContent;
    const normalTitleItemText = titleItemText.startsWith('<!') ? titleItemText.slice(9, titleItemText.length - 3) : titleItemText;
    const href = item.querySelector('link');
    const hrefText = href.textContent;
    const description = item.querySelector('description');
    const descriptionText = description === null ? normalTitleItemText : description.textContent;
    return [...acc, {
      uniq, id: itemID, title: normalTitleItemText, href: hrefText, description: descriptionText,
    }];
  }, []);
  newState.posts = postsItem.concat(state.posts);
  newState.process = 'filling';
  newState.errors = 'ok';
  const form = document.querySelector('form');
  form.reset();
};
