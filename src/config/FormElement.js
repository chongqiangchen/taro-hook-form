export const attachChange = (event, name, ref) => {
  const InputEvents = ref.__handlers.input || [];
  const hanlde = e => {
    event.emit(name, [name, e.detail.value]);
  };
  ref.__handlers.input = [...InputEvents, hanlde];
};
