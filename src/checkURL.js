import * as yup from 'yup';
import _ from 'lodash';
import parseData from './parseData.js';

const schema = yup.object().shape({
  url: yup.string().required().url().matches(/(rss)/),
});
const validate = (url) => {
  try {
    schema.validateSync(url, { abortEarly: false });
    return {};
  } catch (e) {
    return _.keyBy(e.inner, 'path');
  }
};
export default (state, urlRSS) => {
  const errorsFirst = validate({ url: urlRSS });
  if (!_.isEqual(errorsFirst, {})) {
    const newState = state;
    newState.errors = errorsFirst.url.message;
    newState.process = 'filling';
    return;
  }
  fetch(`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(urlRSS)}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error('Network response was not ok.');
    })
    .then((data) => parseData(state, data, urlRSS));
};
