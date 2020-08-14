export { required } from './required';
export { pattern } from './pattern';

let VerifyActions = {
  required,
  pattern,
};

const updateVerfyActions = (actions) => {
  VerifyActions = Object.assign(VerifyActions, actions);
};

export { VerifyActions, updateVerfyActions };
