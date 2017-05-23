(factory => {
  if (typeof require === 'function' && typeof exports === 'object') {
    // Define as CommonJS export:
    module.exports = factory(
      require('backbone'),
      require('babel-polyfill')
    );
  } else if (typeof define === 'function' && define.amd) {
    // Define as AMD:
    define([
      'backbone',
      'babel-polyfill'
    ], factory);
  } else {
    // Browser:
    factory(window.Backbone);
  }
})(Backbone => {
  if (!Promise) {
    throw new Error('ES6 Promise is not defined. To avoid this error add "babel-polyfill" to your project');
  }

  Backbone.Promise = Promise;

  (function overrideAjax() {
    Backbone.ajax = function() {
      return Backbone.Promise.resolve(Backbone.$.ajax.apply(Backbone.$, arguments));
    };
  })();

  (function overrideSync() {
    const originalSync = Backbone.sync;

    Backbone.sync = function(method, model, options) {
      return originalSync(method, model, options).then(() => model);
    };
  })();

  (function overrideModelSave() {
    const originalSave = Backbone.Model.prototype.save;

    Backbone.Model.prototype.save = function() {
      const xhr = originalSave.apply(this, arguments);

      return xhr ? xhr : Backbone.Promise.reject(new Error('Model save error'));
    };
  })();

  (function overrideModelDestroy() {
    const originalDestroy = Backbone.Model.prototype.destroy;

    Backbone.Model.prototype.destroy = function() {
      const xhr = originalDestroy.apply(this, arguments);

      return xhr ? xhr : Backbone.Promise.reject(new Error('Model destroy error'));
    };
  })();

  return Backbone.Promise;
});
