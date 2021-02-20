import onChange from 'on-change';
import renderBody from './renderBody.js';
import renderRSS from './renderRSS.js';
import renderProcess from './renderProcess.js';

export default (state) => {
  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'process':
        renderProcess(watchedState);
        break;
      case 'feeds':
        renderBody(watchedState);
        break;
      case 'posts':
        renderBody(watchedState);
        break;
      case 'errors':
        renderRSS(watchedState);
        break;
      default:
        break;
    }
  });
  return watchedState;
};
