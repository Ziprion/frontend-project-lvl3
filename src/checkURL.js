import * as yup from 'yup';
import axios from 'axios';
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
  const newState = state;
  const errorsFirst = validate({ url });
  if (!_.isEqual(errorsFirst, {})) {
    newState.errors = errorsFirst.url.message;
    newState.process = 'filling';
    return;
  }
  axios({
    method: 'get',
    url: `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(url)}`,
    headers: {
      accept: 'application/json, text/plain, */*',
    },
  })
    .then((response) => parseData(state, response.data, url))
    .catch((err) => {
      newState.errors = err.message;
      throw err;
    });
};
