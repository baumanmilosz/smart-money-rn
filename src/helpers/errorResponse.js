import {get} from 'lodash';

const errorResponse = (e) => {
  return get(e, 'response.data.error[0].msg');
};

export default errorResponse;
