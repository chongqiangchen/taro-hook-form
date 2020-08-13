class EventEmitter {
  data = {};

  on(key, page, callback) {
    if (!this.data[key]) {
      this.data[key] = [];
    }
    this.data[key].push({
      page,
      callback,
    });
  }

  emit(key, ...args) {
    if (!this.data[key]) {
      console.error(`this ${key} event is not have`);
      return;
    }
    const array = this.data[key];
    array.forEach((item) => {
      item.callback.apply(this, args);
    });
  }

  off(key, page) {
    if (!this.data[key]) {
      console.error(`this ${key} event is not have`);
      return;
    }
    const array = this.data[key];
    const index = array.findIndex((item) => item.page === page);
    array.splice(index, 1);
    this.data[key] = array;

    if (this.data[key].length === 0) {
      delete this.data[key];
    }
  }
}

export default new EventEmitter();
