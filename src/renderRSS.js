import i18next from 'i18next';

export default (state) => {
  const feedback = document.querySelector('.feedback');
  feedback.classList.remove('text-success', 'text-danger');
  if (state.errors === 'ok') {
    feedback.classList.add('text-success');
    feedback.textContent = i18next.t('success');
    return;
  }
  feedback.classList.add('text-danger');
  const log = state.errors;
  let message = '';
  switch (log) {
    case 'url must be a valid URL':
      message = i18next.t('noValidUrl');
      break;
    case 'same RSS':
      message = i18next.t('sameRSS');
      break;
    default:
      message = i18next.t('noRSS');
      break;
  }
  feedback.textContent = message;
};
