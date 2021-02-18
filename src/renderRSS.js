export default (state) => {
  const feedback = document.querySelector('.feedback');
  feedback.classList.remove('text-success', 'text-danger');
  if (_.isEqual(state.errors, {})) {
    feedback.classList.add('text-success');
    feedback.textContent = 'RSS успешно загружен';
    return;
  }
  feedback.classList.add('text-danger');
  const log = state.errors.url.message;
  let message = '';
  switch (log) {
    case 'url must match the following: "/(rss)/"':
      message = 'GDE RSS?';
      break;
    case 'url must be a valid URL':
      message = 'GDE URL?';
      break;
    default:
      message = 'PODSTAVA';
  };
  feedback.textContent = message;
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