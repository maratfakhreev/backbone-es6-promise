((factory) => {
  if (typeof require === 'function' && typeof exports === 'object') {
    // Define as CommonJS export:
    module.exports = factory(
      require('backbone'),
      require('promise-polyfill')
    );
  }
  else if (typeof define === 'function' && define.amd) {
    // Define as AMD:
    define([
      'backbone',
      'promise-polyfill'
    ], factory);
  }
  else {
    // Browser:
    factory(window.Backbone);
  }
})((Backbone) => {
  if (!Promise) {
    throw new Error('ES6 Promise is not defined. To avoid this error add promise-polyfill lib to your project');
  }

  Backbone.Promise = Promise;

  class BackbonePromiseOverrider {
    static overrideAll() {
      this.overrideBackboneAjax();
      this.overrideBackboneSync();
      this.overrideBackboneModelSave();
      this.overrideBackboneModelDestroy();
    }

    static overrideBackboneAjax() {
      Backbone.ajax = function() {
        return Backbone.Promise.resolve(Backbone.$.ajax.apply(Backbone.$, arguments));
      };
    }

    static overrideBackboneSync() {
      const originalSync = Backbone.sync;

      Backbone.sync = function(method, model, options) {
        return originalSync(method, model, options).then(() => { return model; });
      };
    }

    static overrideBackboneModelSave() {
      const originalSave = Backbone.Model.prototype.save;

      Backbone.Model.prototype.save = function() {
        const xhr = originalSave.apply(this, arguments);

        return (xhr !== false) ? xhr : Backbone.Promise.reject(new Error('Model save error'));
      };
    }

    static overrideBackboneModelDestroy() {
      const originalDestroy = Backbone.Model.prototype.destroy;

      Backbone.Model.prototype.destroy = function() {
        const xhr = originalDestroy.apply(this, arguments);

        return (xhr !== false) ? xhr : Backbone.Promise.reject(new Error('Model destroy error'));
      };
    }
  }

  return BackbonePromiseOverrider.overrideAll();
});
