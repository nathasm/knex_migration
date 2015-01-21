var f = require('faker');

exports.seed = function(knex, Promise) {

  var companies = [];

  var users = [];

  var generateUser = function() {
    return {
      username: f.internet.userName(),
      email: f.internet.email(),
      password: f.internet.password()
    };
  };

  var generateCompany = function(userId) {
    return {
      name: f.company.companyName(),
      logo: f.image.abstract(),
      website: f.internet.domainName(),
      contact: f.name.findName(),
      address: f.address.streetAddress(),
      city: f.address.city(),
      state: f.address.stateAbbr(),
      zip: f.address.zipCode(),
      description: f.company.bs(),
      industry: f.company.catchPhraseNoun(),

      user_id: userId,
      demographics_id: f.helpers.randomNumber({min: 1, max: 3}),
      ages_id: f.helpers.randomNumber({min: 1, max: 5}),
      email_list_sizes_id: f.helpers.randomNumber({min: 1, max: 8})
    };
  };

  for(var i = 1; i <= 10; i += 1) {
    users.push(generateUser());
  }
  users.push({
    username: 'nsmith',
    email: 'nathasm@gmail.com',
    password: '$2a$10$nt8jRtN0OaecoOciZpEzAuylOZzbdmmwRIx/1sVbRedKV45B7rLdO'
  });

  for(i = 1; i <= 11; i += 1) {
    companies.push(generateCompany(i));
  }

  return knex('users').insert(users)
  .then(function() {
    return knex('companies').insert(companies);
  });
};
