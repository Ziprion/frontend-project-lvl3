export default (state) => {
  const submit = document.querySelector('button[aria-label="add"]');
  if (state.process === 'checking') {
    const feedback = document.querySelector('.feedback');
    feedback.classList.remove('text-success', 'text-danger');
    feedback.innerHTML = '';
    submit.disabled = true;
  } else {
    submit.disabled = false;
  }
};
