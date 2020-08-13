export const attachChange = (event, name, ref) => {
  const oldFunction = ref.handleInput;
  ref.handleInput = e => {
    oldFunction.call(ref, e);
    event.emit(name, [name, e.detail.value]);
  };
};
