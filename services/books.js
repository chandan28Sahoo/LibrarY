const Users = require('../models/all_models').books
    // const Users = new User();

module.exports = class UserService {
    async findAll(txn) {
        return await Users.query(txn);
    }

    async createBooks(details) {
        return await Users.query().insertGraph(details);
    }

    async find_by_name(name) {
        return await Users.query().findOne({ name: name });
    }

    async updateByBookName(name,details) {
        console.log(details);
        const updateRiddles = await Users.query().findOne({ name: name });
        const updated = await updateRiddles.$query().patch(details)
        return updated;
    }

    async deleteBook_by_name(name) {
        const deleteRiddles = await Users.query().findOne({ name: name });
        const deletes = await deleteRiddles.$query().delete()
        return deletes;
    }
}