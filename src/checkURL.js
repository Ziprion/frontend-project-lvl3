import parseData from './parseData.js';
import * as yup from 'yup';
import _ from 'lodash';

export default (state, urlRSS) => {
  const validate = (url) => {
    try {
      schema.validateSync(url, { abortEarly: false });
      return {};
    } catch (e) {
      return _.keyBy(e.inner, 'path');
    }
  };
  const schema = yup.object().shape({
    url: yup.string().required().url().matches(/(rss)/),
  });
  const errorsOne = validate({ url: urlRSS });
  // console.log(errors);

  fetch(`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(urlRSS)}`)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
    })
    .then(data => {
      state.errors = {};
      parseData(state, data)
      state.errors = { ...state.errors, ...errorsOne }
      console.log('ASDASDASD' + state.errors)
    })


}
