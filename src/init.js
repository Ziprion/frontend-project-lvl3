import 'bootstrap';
import i18n from 'i18next';
import checkURL from './checkURL.js';
import view from './view.js';
import resources from './locales';
import checkRSS from './checkRSS.js';

export default () => {
  i18n.init({
    lng: 'en',
    resources,
  }, function(err, t) {const state = {
    process: 'filling',
    errors: '',
    feeds: [],
    posts: [],
    uniq: 0,
  };
  const watchedState = view(state);
  const form = document.querySelector('form');
  const submit = document.querySelector('button[aria-label="add"]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.process = 'checking';
    state.errors = '';
    const formData = new FormData(e.target);
    const url = formData.get('url');
    checkURL(watchedState, url);
    form.reset();
    form.focus();
    submit.blur();
  });
  setTimeout(checkRSS, 5000, state);})
    
  
};
