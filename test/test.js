describe('backbone-es6-promise', function() {
  this.timeout(20000);
  this.slow(3000);

  var root = 'http://jsonplaceholder.typicode.com';

  beforeEach(function() {
    this.Model = Backbone.Model.extend({
      urlRoot: root + '/posts'
    });
  });

  describe('fetch then', function() {
    it('model fetch has success statement', function(done) {
      var model = new this.Model({ id: 1 });

      model.fetch().then(function() {
        done();
      });
    });

    it('id is equal to "1"', function(done) {
      var model = new this.Model({ id: 1 });

      model.fetch().then(function(data) {
        expect(data.id).to.equal(1);
        done();
      });
    });
  });

  describe('fetch catch', function() {
    it('model fetch has error statement', function(done) {
      var model = new this.Model({ id: 132489 });

      model.fetch().catch(function(err) {
        done();
      });
    });
  });

  describe('save then', function() {
    it('model save has success statement', function(done) {
      var model = new this.Model({
        title: 'foo',
        body: 'bar',
        userId: 1
      });

      model.save().then(function(data) {
        done();
      });
    });

    it('id is equal to "101"', function(done) {
      var model = new this.Model({
        title: 'foo',
        body: 'bar',
        userId: 1
      });

      model.save().then(function(data) {
        expect(data.id).to.equal(101);
        done();
      });
    });

    it('model update has success statement', function(done) {
      var model = new this.Model({
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1
      });

      model.save().then(function(data) {
        done();
      });
    });
  });

  describe('save catch', function() {
    it('model save has error statement', function(done) {
      var model = new this.Model();
      model.urlRoot = root + '/fake_posts'

      model.save().catch(function(err) {
        done();
      });
    });
  });

  describe('destroy then', function() {
    it('model destroy has success statement', function(done) {
      var model = new this.Model({ id: 1 });

      model.destroy().then(function(data) {
        done();
      });
    });
  });

  describe('destroy catch', function() {
    it('model destroy has error statement', function(done) {
      var model = new this.Model({ id: 13124 });

      model.destroy().catch(function(err) {
        done();
      });
    });
  });
});
