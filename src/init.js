import 'bootstrap';
import i18next from 'i18next';
import checkURL from './checkURL.js';
import view from './view.js';
import checkRSS from './checkRSS.js';

export default () => {
  i18next.init({
    lng: 'ru',
    resources: {
      ru: {
        translation: {
          success: 'RSS успешно загружен',
          noValidUrl: 'Ссылка должна быть валидным URL',
          sameRSS: 'RSS уже существует',
          noRSS: 'Ресурс не содержит валидный RSS',
        },
      },
    },
  }).then(() => {
    const state = {
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
      if (watchedState.errors === 'ok') {
        form.reset();
      }
      form.focus();
      submit.blur();
      setTimeout(checkRSS, 5000, state);
    });
  });
};
