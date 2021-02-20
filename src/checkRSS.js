import _ from 'lodash';
import renderBody from './renderBody';

const checkRSS = (state) => {
  const currentFeeds = state.feeds;
  currentFeeds.forEach((feed) => {
    const currentUrl = feed.url;
    fetch(`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(currentUrl)}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        const items = doc.querySelectorAll('item');
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
        const currentPosts = feed.posts;
        const currentTitles = currentPosts.map((post) => post.title);
        const newPosts = postsItem.filter((item) => !currentTitles.includes(item.title))
        if (newPosts.length > 0) {
          console.log(newPosts)
        }
      });
  })
  renderBody(state);
  setTimeout(checkRSS, 5000, state)  
};
export default checkRSS;
 