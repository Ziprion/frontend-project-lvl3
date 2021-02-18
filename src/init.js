import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import renderBody from './renderBody.js';
import checkURL from './checkURL.js';
import onChange from 'on-change';
import * as yup from 'yup';
import _ from 'lodash';
import renderRSS from './renderRSS.js';

export default () => {
  const state = {
    errors: {},
    feeds: []
  }
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const urlRSS = formData.get('url');
    checkURL(watchedState, urlRSS);
    form.reset();
  });
  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'feeds':
        renderBody(watchedState);
        break;
      case 'errors':
        renderRSS(watchedState);
        break;
    }
    
  })
}
