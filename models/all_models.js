const { Model } = require('objection');
const Knex = require('../config/config');
Model.knex(Knex)

const unique = require('objection-unique')({
    fields: ['email'],
    identifiers: ['id']
});

// Teachers
class teachers extends unique(Model) {
    static get tableName() {
        return 'teachers';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                email: { type: 'string' },
                phone_no: { type: 'string' },
                password: { type: 'string' },
                user_type: { type: 'string' }
            }
        };
    }
}


// students
class students extends unique(Model) {
    static get tableName() {
        return 'students';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                class: { type: 'string' },
                phone_no: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },

            }
        };
    }
}


// Books
class books extends unique(Model) {
    static get tableName() {
        return 'books';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                Author: { type: 'string' }
            }
        };
    }
}

// Librarian
class librarian extends unique(Model) {
    static get tableName() {
        return 'librarian';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                teacher_id: { type: 'integer' }
            }
        };
    }
}


// Library
class library extends unique(Model) {
    static get tableName() {
        return 'library';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                student_name: { type: 'string' },
                book_name: { type: 'string' },
                book_id: { type: 'integer' },
                student_id: { type: 'integer' },
                librarian_id: { type: 'integer' }
            }
        };
    }
    static get relationMappings() {
        return {
            students: {
                relation: Model.HasOneRelation,
                modelClass: students,
                join: {
                    from: 'library.student_id',
                    to: 'students.id'
                }
            },
            librarian: {
                relation: Model.HasOneRelation,
                modelClass: librarian,
                join: {
                    from: 'library.librarian_id',
                    to: 'librarian.id'
                }
            }
        }
    }
}

module.exports = { teachers, students, books, librarian, library }