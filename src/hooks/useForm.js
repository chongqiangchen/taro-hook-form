import { useState, useRef, useCallback, useEffect } from 'react';
import event from '../utils/event';
import { isNil, isObject, getComponentType } from '../utils/common';
import useUnmount from './useUnmount';
import * as Config from '../config';

const SUCCESS_FLAG = 'success';
// const ERROR_FLAG = 'error'

/**
 * 校验动作处理
 * @param ruleObj object: { rule, error }
 *
 * return error: 表示校验错误， success: 表示校验成功
 */
const verifyDefaultActions = {
  required: (value, ruleObj = { rule: true, error: '' }) => {
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
  },
  // maxLength: value => {},
  pattern: (value, ruleObj = { rule: null, error: '' }) => {
    if (!ruleObj.rule) {
      return SUCCESS_FLAG;
    }

    if (!ruleObj.rule.test(value)) {
      return ruleObj.error;
    }

    return SUCCESS_FLAG;
  },
  // min: value => {},
  // max: value => {}
};

/**
 * 监听输入框改变事件
 * @param {*} ref
 * @param {*} handleChange
 */
function attachListerner(ref, handleChange) {
  const { name } = ref.props;
  event.on(name, 'INPUT_FIELD', handleChange);

  Config[getComponentType(ref)].attachChange(event, name, ref);
}

/**
 * TODO: 可以自定义校验规则
 * @param {*} verifyLazy 是否在输入时就校验输入是否错误
 */
function useForm({ verifyLazy }) {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const namesRef = useRef([]);
  const validationMap = useRef({});

  const handleChangeRef = useRef(([name, value]) => {
    if (validationMap.current[name] && !verifyLazy) {
      hanldeVerifyActions(name, value, validationMap.current[name]);
    }
    setValue({ [name]: value });
  });

  /**
   * 注册， 通过Ref绑定相关AtInput, AtTextarea， 暂时只针对Taro-ui
   * 因为原生小程序的Input和Textarea暂时不知道从哪获知props
   * @param {*} ref
   * @param {*} ValidationOptions required, maxLength, pattern, min, max
   */
  function register(ref, ValidationOptions) {
    if (!ref) return;

    const { name, value } = ref.props;

    if (namesRef.current.includes(name)) {
      return;
    }
    namesRef.current.push(name);

    setValue({ [name]: value });
    if (ValidationOptions) {
      validationMap.current[name] = ValidationOptions;
    }

    attachListerner(ref, handleChangeRef.current);
    return;
  }

  function setValue(nameAndValue) {
    // TODO: 是否对无用数据(other), 进行过滤{[name]: value, other: xxx}
    setFormValues((v) => ({ ...v, ...nameAndValue }));
  }

  function getValue(name) {
    return formValues[name];
  }

  // TODO: 格式化Value， 单独设定 或者 全局设定
  // function formatValue() {}

  function handleSubmit(func) {
    return () => {
      const validationMapNames = Object.keys(validationMap.current);

      for (const name of validationMapNames) {
        const result = hanldeVerifyActions(name, formValues[name], validationMap.current[name]);

        if (!result) return;
      }

      // NOTE: 此处第一次拿不到errors
      if (func) {
        func(formValues);
      }
    };
  }

  function hanldeVerifyActions(name, value, validationOptions) {
    const vOptsKeys = Object.keys(validationOptions);
    for (const key of vOptsKeys) {
      //TODO: 确认是否存在Key,报错
      let vOpts = validationOptions[key];

      if (!isObject(vOpts)) {
        vOpts = {
          rule: vOpts,
          error: '',
        };
      }

      const currentResult = verifyDefaultActions[key](value, vOpts);

      if (currentResult !== SUCCESS_FLAG) {
        // TODO: 是否需要变为多个错误提示，（当前只是显示一个error的存储）
        setErrors({ [name]: currentResult });
        return false;
      }

      setErrors((e) => {
        delete e[name];
        return e;
      });
    }

    return true;
  }

  // 校验是否完成，只是针对required进行校验是否存在必填项未填完整
  useEffect(() => {
    const keys = Object.keys(validationMap.current);
    for (const key of keys) {
      const isRequired = isObject(validationMap.current[key].required)
        ? validationMap.current[key].required.rule
        : validationMap.current[key].required;

      if (isRequired && isNil(formValues[key])) {
        setIsCompleted(false);
        return;
      }
    }

    setIsCompleted(true);
  }, [formValues]);

  useUnmount(() => {
    namesRef.current.forEach((name) => {
      event.off(name);
    });

    namesRef.current = [];
  });

  return {
    register: useCallback(register, [handleChangeRef.current]),
    setValue: useCallback(setValue, []),
    getValue: getValue,
    handleSubmit,
    formValues,
    isCompleted,
    errors,
  };
}

export default useForm;
