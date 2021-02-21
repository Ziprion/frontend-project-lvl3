import * as yup from 'yup';
import _ from 'lodash';
import parseData from './parseData.js';

const schema = yup.object().shape({
  url: yup.string().required().url(),
});
const validate = (url) => {
  try {
    schema.validateSync(url, { abortEarly: false });
    return {};
  } catch (e) {
    return _.keyBy(e.inner, 'path');
  }
};
export default (state, url) => {
  const errorsFirst = validate({ url });
  if (!_.isEqual(errorsFirst, {})) {
    const newState = state;
    newState.errors = errorsFirst.url.message;
    newState.process = 'filling';
    return;
  }
  fetch(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error('Network response was not ok.');
    })
    .then((data) => parseData(state, data, url));
};
