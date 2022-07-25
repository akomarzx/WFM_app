// script that will be used to build
// the request string for put,patch,delete,and get one
// in forms
let actionCache;
let form;
let selectBox;
if (String.prototype.splice === undefined) {
  /**
   * Splices text within a string.
   * @param {int} offset The position to insert the text at (before)
   * @param {string} text The text to insert
   * @param {int} [removeCount=0] An optional number of characters to overwrite
   * @return {string} A modified string containing the spliced text.
   */
  // eslint-disable-next-line no-extend-native
  String.prototype.splice = function(offset, text, removeCount=0) {
    const calculatedOffset = offset < 0 ? this.length + offset : offset;
    return this.substring(0, calculatedOffset) +
      text + this.substring(calculatedOffset + removeCount);
  };
}

window.addEventListener('DOMContentLoaded', function() {
  form = document.querySelector('#mainForm');
  selectBox = document.querySelector('select');
  selectBox.addEventListener('change', function(e) {
    const index = actionCache.indexOf('?');
    form.action = actionCache.splice(index, `/${e.target.value}`);
  });
  actionCache = form.action;
});

