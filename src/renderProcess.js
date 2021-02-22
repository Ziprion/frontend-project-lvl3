export default (state) => {
  console.log(state);
  const input = document.querySelector('input');
  const submit = document.querySelector('button[aria-label="add"]');
  if (state.process === 'checking') {
    const feedback = document.querySelector('.feedback');
    feedback.classList.remove('text-success', 'text-danger');
    feedback.innerHTML = '';
    submit.disabled = true;
    input.setAttribute('readonly', 'readonly');
  } else {
    submit.disabled = false;
    input.removeAttribute('readonly', 'readonly');
  }
};
