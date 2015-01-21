
exports.seed = function(knex, Promise) {
  return knex('ages').insert([
    { name: '0-17' },
    { name: '18-24' },
    { name: '25-35' },
    { name: '36-50' },
    { name: '50+' },
  ]).then(function() {
    return knex('demographics').insert([
      { name: 'Male' },
      { name: 'Female' },
      { name: 'Both' }
    ]);
  }).then(function() {
    return knex('email_list_sizes').insert([
      { name: '0-5k' },
      { name: '5k-20k' },
      { name: '20k-50k' },
      { name: '50k-100k' },
      { name: '100k-250k' },
      { name: '250k-500k' },
      { name: '500k-1M' },
      { name: '1M+' },
    ]);
  });
};
