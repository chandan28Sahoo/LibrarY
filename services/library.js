const library = require('../models/all_models').library

module.exports = class UserService {
    async findAll(txn) {
        return await library.query(txn);
    }
    async createUsers_librarian(details) {
        return await library.query().insert(details);
    }
}