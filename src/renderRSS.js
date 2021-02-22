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
  switch (log) {
    case 'no internet':
      feedback.textContent = 'Ошибка сети';
      break;
    case 'Network Error':
      feedback.textContent = 'Ошибка сети';
      // newState.process = 'filling';
      break;
    case 'url must be a valid URL':
      feedback.textContent = 'Ссылка должна быть валидным URL';
      break;
    case 'same RSS':
      feedback.textContent = 'RSS уже существует';
      break;
    case 'ALERT! RSS':
      feedback.textContent = 'Ресурс не содержит валидный RSS';
      break;
    default:
      feedback.textContent = 'RSS уже существует';
      break;
  }
};
/**
 *success: 'RSS успешно загружен',
          noValidUrl: 'Ссылка должна быть валидным URL',
          sameRSS: 'RSS уже существует',
          noRSS: 'Ресурс не содержит валидный RSS',
 */
