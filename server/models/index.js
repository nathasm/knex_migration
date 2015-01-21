var bookshelf = require('../config/bookshelf');
var config = require('../config');
var errors = require('../errors');
var bcrypt = require('bcryptjs');
var bluebird = require('bluebird');
var Checkit = require('checkit');
bluebird.promisifyAll(bcrypt);

var generatePasswordHash = function(password) {
  return bcrypt.genSaltAsync(config.salt_work_factor).then(function(salt) {
    return bcrypt.hashAsync(password, salt);
  });
};

var User = bookshelf.Model.extend({
  hasTimestamps: true,
  tableName: 'users',

  company: function() {
    return this.hasOne('Company');
  },

  initialize: function() {
    this.on('saving', this.validate.bind(this));
  },
  validate: function() {
    return new Checkit(this.validations).run(this.toJSON());
  },

  validations: {
    username: [ 'required' ],
    email: [ 'required', 'email' ]
  }
}, {
  add: function(data, options) {
    var self = this;
    return this.getByUsername(data.username).then(function(user) {
      if(user) {
        return bluebird.reject(new errors.BadRequestError('Username already exists'));
      }
      return generatePasswordHash(data.password).then(function(encryptedPassword) {
        data.password = encryptedPassword;
        return self.forge(data).save().catch(function(err) {
          return bluebird.reject(new errors.ValidationError(err));
        });
      });
    });
  },
  verifyPassword: function verifyPassword(inputPassword, existingPassword) {
    return bcrypt.compareAsync(inputPassword, existingPassword);
  },
  getByUsername: function(username, options) {
    options = options || {};
    return this.where({ username: username }).fetch(options);
  }
});

var Company = bookshelf.Model.extend({
  hasTimestamps: true,
  tableName: 'companies',
  user: function() {
    return this.belongsTo('User');
  }
});

var Age = bookshelf.Model.extend({
  tableName: 'ages'
});

var Demographic = bookshelf.Model.extend({
  tableName: 'demographics'
});

var Companies = bookshelf.Collection.extend({
  model: Company
});

module.exports = {
  User: bookshelf.model('User', User),
  Company: bookshelf.model('Company', Company),
  Companies: bookshelf.collection('Companies', Companies),
  Age: bookshelf.model('Age', Age),
  Demographic: bookshelf.model('Demographic', Demographic)
};
