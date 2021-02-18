export default (state,data) => {
  const parser = new DOMParser()
      const doc = parser.parseFromString(data.contents, "text/html")
      console.log(data.contents);
      const rss = doc.querySelector('rss');
      if (rss === null) {
        state.errors = { url: 'PODSTAVA'};
        return;
      }
      const titleFeed = doc.querySelector('title');
      const titleFeedText = titleFeed.textContent;
      const descriptionFeed = doc.querySelector('description');
      const descriptionFeedText = descriptionFeed.textContent;
      const items = doc.querySelectorAll('item');
      const postsItem = Array.from(items).reduce((acc, item) => {
        const titleItem = item.querySelector('title');
        const titleItemText = titleItem.textContent;
        const normalTitleItemText = titleItemText.startsWith('<!') ? titleItemText.slice(9, titleItemText.length - 3): titleItemText;
        const href = item.querySelector('link');
        const hrefText = href.nextSibling.data;
        const description = item.querySelector('description');
        const descriptionText = description.textContent;
        return [...acc, { title: normalTitleItemText, href: hrefText}];
      }, []);
      state.feeds.push({ title: titleFeedText, description: descriptionFeedText, posts: postsItem });
    
    console.log(state);
    return state;
}




// const container = document.querySelector('.container');
// const button = document.querySelector('[type="submit"]');
// const form = document.querySelector('form');
// const renderErrors = (fieldsElements, errors) => {
//   Object.entries(fieldsElements).forEach(([name, element]) => {
//     const errorElement = element.nextElementSibling;
//     const error = errors[name];
//     if (errorElement) {
//       element.classList.remove('is-invalid');
//       errorElement.remove();
//     }
//     if (!error) {
//       return;
//     }
//     const feedBackElement = document.createElement('div');
//     feedBackElement.classList.add('invalid-feedback');
//     feedBackElement.textContent = error.message;
//     element.classList.add('is-invalid');
//     element.after(feedBackElement);
//   });