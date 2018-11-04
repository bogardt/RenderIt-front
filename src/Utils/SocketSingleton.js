class SocketSingleton {
  constructor() {
    this.socket = null;
  }

  get Socket() {
    return this.socket;
  }

  set Socket(value) {
    this.socket = value;
  }
}

export default new SocketSingleton();
