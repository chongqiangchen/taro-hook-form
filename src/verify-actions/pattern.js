  import { SUCCESS_FLAG } from '../utils/constants';

  export const action = (value, ruleObj = { rule: null, error: '' }) => {
    if (!ruleObj.rule) {
      return SUCCESS_FLAG;
    }

    if (!ruleObj.rule.test(value)) {
      return ruleObj.error;
    }

    return SUCCESS_FLAG;
  }