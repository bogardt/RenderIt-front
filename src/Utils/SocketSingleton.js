class SocketSingleton {
  constructor() {
    this.type = 'SocketSingleton';
    this.socket = null;
  }

  singletonMethod() {
    return 'singletonMethod';
  }
  static staticMethod() {
    return 'staticMethod';
  }

  get type() {
    return this.type;
  }

  set type(value) {
    this.type = value;
  }

  get socket() {
    return this.socket;
  }

  set socket(socket) {
    this.socket = socket;
  }
}

export default new SocketSingleton();
