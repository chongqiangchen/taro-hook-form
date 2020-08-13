export const isType = type => {
  return obj => {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  };
};

export const isNullOrUndefined = value => {
  return value === null || value === undefined;
};

export const isArray = isType("Array");
export const isObject = isType("Object");
export const isString = isType("String");
export const isRegExp = isType("RegExp");

export const isNil = value => {
  return (
    isNullOrUndefined(value) ||
    JSON.stringify(value) === "[]" ||
    JSON.stringify(value) === "{}" ||
    value === ""
  );
};

export const isEmptyArray = value => {
  return value.length === 0;
};

export const isElement = value => {
  return isObject(value) && value.$componentType === "COMPONENT";
};

export const getComponentType = value => {
  return value.constructor.name;
};

export const isFormElement = value => {
  return getComponentType(value) === "FormElement";
};

export const isAtInput = value => {
  return getComponentType(value) === "AtInput";
};
