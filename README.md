## Backbone ES6 promise

A plugin for Backbone.js that overrides default promises with modern ES6 promises.

[![Build Status](https://travis-ci.org/maratfakhreev/backbone-es6-promise.svg?branch=master)](https://travis-ci.org/maratfakhreev/backbone-es6-promise)

Backbone ES6 promise is the simple plugin that overrides old, not trendy jQuery promises with new, awesome ES6 promises. With this tool all your request methods of models and collections will return ES6 promises.

### How to install:

```bash
npm install backbone-es6-promise
```

**Browser:**
```javascript
<script>...</script>
<!-- add polyfill if you want to support old browsers -->
<script src='promise-polyfill/promise.js'></script>
<script src='backbone-es6-promise.js' type='text/javascript'></script>
```

**Common JS:**
```javascript
require('backbone-es6-promise');
```

### How to use:

Just start to write your code with ES6 promise syntax.

```javascript
const Model = Backbone.Model.extend({ urlRoot: 'url' });
const model = new Model({
  id: 1,
  someAttribute: 'some attribute'
});

model.fetch().then(function(data) {
  console.log(data);
}).catch(function(errorObject) {
  console.log(errorObject);
});
```

Also you are able to write your custom promises in same style with Backbone.Promise function. Don't worry, no magic here, it is just an alias for ES6 Promise function.

```javascript
const promise = new Backbone.Promise(function(resolve, reject) {
  // do a something async
  if (/* everything turned out fine */) {
    resolve('Stuff worked!');
  }
  else {
    reject(Error('It brokes'));
  }
});
```
