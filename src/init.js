import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import checkURL from './checkURL.js';
import view from './view.js';

export default () => {
  const state = {
    process: 'filling',
    errors: '',
    feeds: [],
  };
  const watchedState = view(state);
  const form = document.querySelector('form');
  const submit = document.querySelector('button[aria-label="add"]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.process = 'checking';
    const formData = new FormData(e.target);
    const urlRSS = formData.get('url');
    checkURL(watchedState, urlRSS);
    form.reset();
    form.focus();
    submit.blur();
  });
};
