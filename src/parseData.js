export default (state, data, urlRSS) => {
  const newState = state;
  const parser = new DOMParser();
  const doc = parser.parseFromString(data.contents, 'text/html');
  console.log(doc)
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
  const descriptionFeed = doc.querySelector('description');
  const descriptionFeedText = descriptionFeed.textContent;
  const items = doc.querySelectorAll('item');
  console.log(items);
  const postsItem = Array.from(items).reduce((acc, item) => {
    const titleItem = item.querySelector('title');
    const titleItemText = titleItem.textContent;
    const normalTitleItemText = titleItemText.startsWith('<!') ? titleItemText.slice(9, titleItemText.length - 3) : titleItemText;
    const href = item.querySelector('link');
    const hrefText = href.nextSibling.data;
    //const description = item.querySelector('description');
    const descriptionText = 'description.textContent';
    return [...acc, { title: normalTitleItemText, href: hrefText, description: descriptionText }];
  }, []);
  state.feeds.push({ title: titleFeedText, url: linkFeed, description: descriptionFeedText, posts: postsItem });
  newState.process = 'filling';
  newState.errors = 'ok';
};
