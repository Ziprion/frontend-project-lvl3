export default (state) => {
  // const newState = state;
  const feedback = document.querySelector('.feedback');
  feedback.classList.remove('text-success', 'text-danger');
  const input = document.querySelector('input');
  if (state.errors === 'ok') {
    feedback.classList.add('text-success');
    feedback.textContent = 'RSS успешно загружен';
    input.classList.remove('is-invalid');
    return;
  }
  feedback.classList.add('text-danger');
  input.classList.add('is-invalid');
  const log = state.errors;
  let message = '';
  switch (log) {
    case 'no internet':
      message = 'Ошибка сети';
      break;
    case 'Network Error':
      message = 'Ошибка сети';
      // newState.process = 'filling';
      break;
    case 'url must be a valid URL':
      message = 'Ссылка должна быть валидным URL';
      break;
    case 'same RSS':
      message = 'RSS уже существует';
      break;
    default:
      message = 'Ресурс не содержит валидный RSS';
      break;
  }
  feedback.textContent = message;
};
/**
 *success: 'RSS успешно загружен',
          noValidUrl: 'Ссылка должна быть валидным URL',
          sameRSS: 'RSS уже существует',
          noRSS: 'Ресурс не содержит валидный RSS',
 */
