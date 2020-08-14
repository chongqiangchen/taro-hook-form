import { SUCCESS_FLAG } from '../utils/constants';
import { isNil } from '../utils/common';

export const action = (value, ruleObj = { rule: true, error: '' }) => {
  if (!ruleObj.rule) {
    return SUCCESS_FLAG;
  }

  if (isNil(value)) {
    return ruleObj.error;
  }

  // 针对 仅仅输入空格情况
  if (!value.match(/[^\s]/)) {
    return ruleObj.error;
  }

  return SUCCESS_FLAG;
};
