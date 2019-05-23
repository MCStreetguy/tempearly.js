if (typeof window === undefined) {
  throw new ReferenceError('Missing proper reference to window object for initializing Tempearly.js!');
}

if (! 'content' in window.document.createElement('template')) {
  throw new Error('Your browser does not support usage of HTML template tags, which is required for Tempearly.js in order to work properly!');
}

(function (root) {
  if (typeof root.Tempearly !== undefined) {
    console.warn('Tempearly.js seems to have already been loaded. Aborting loading to avoid errors!');
    return -1;
  }

  // Create a safe reference to the Tempearly object for use below.
  var Tempearly = function (obj) {
    if (obj instanceof Tempearly) return obj;
    if (!(this instanceof Tempearly)) return new Tempearly(obj);
    this.libwrapped = obj;
  };

  // Export the Tempearly object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `Tempearly` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Tempearly;
    }
    exports.Tempearly = Tempearly;
  } else {
    root.Tempearly = Tempearly;
  }

  Tempearly.VERSION = '0.0.0';

  Tempearly._loadTpl = function(template) {
    var selector = 'template[data-name="' + template + '"]';
    var target = root.document.querySelector(selector);

    if (target === null) {
      throw new ReferenceError(
        'Cannot find any reference to template with name "' + template + '"!' +
        'Make sure you defined a <template> tag with a proper "data-name" attribute' +
        'and that it is accessible to the current script.'
      );
    }

    return target.content;
  };

  Tempearly.parse = function(template, contents) {
    var template = this._loadTpl(template);

    // TODO
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, Tempearly registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party Tempearly, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('Tempearly', [], function () {
      return Tempearly;
    });
  }
})(window);