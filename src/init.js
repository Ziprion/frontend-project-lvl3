import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from 'i18next';
import checkURL from './checkURL.js';
import view from './view.js';
import resources from './locales';
import checkRSS from './checkRSS.js';

export default () => {
  i18n.init({
    lng: 'ru',
    resources,
  }).then(function () {
    // initialized and ready to go!
    const state = {
      process: 'filling',
      errors: '',
      feeds: [],
      posts: [],
    };
    const watchedState = view(state);
    const form = document.querySelector('form');
    const submit = document.querySelector('button[aria-label="add"]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      watchedState.process = 'checking';
      state.errors = '';
      const formData = new FormData(e.target);
      const urlRSS = formData.get('url');
      checkURL(watchedState, urlRSS);
      form.reset();
      form.focus();
      submit.blur();
      //console.log('Start check')
      setTimeout(checkRSS, 5000, state)
    });
    
  });
};
