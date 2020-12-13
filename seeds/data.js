exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('teachers').del()
        .then(function() {
            // Inserts seed entries
            return knex('teachers').insert([{
                name: 'chandan',
                email: "chandan19@gmail.com",
                password: "chandan19"
            }]);
        });
};