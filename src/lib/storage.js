export class Storage {
  static write(key, value) {
     window && window.localStorage.setItem(key, value);
  }

  static read(key) {
     return window && window.localStorage.getItem(key);
  }
}
