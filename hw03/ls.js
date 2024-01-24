class LS {
  key = '';
  like = 0;

  getHistory() {
    const lslen = localStorage.length;
    let result = [];
    if (lslen) {
      for (let i = 0; i < lslen; i++) {
        const key = localStorage.key(i)
        result[i] = localStorage.key(i) + `_${localStorage.getItem(key)}`;
      }
    }

console.log(result);
    return result
  }

  get likes() {
    this.like = +localStorage.getItem(this.key);
    return this.like;
  }

  set likes(count) {
    this.like = count;
    localStorage.setItem(this.key, this.like);
  }

  constructor(key) {
    this.key = key;
  }
}