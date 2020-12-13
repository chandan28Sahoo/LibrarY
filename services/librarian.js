const librarian = require("../models/all_models").librarian;
const student = require("../models/all_models").library;
// const Users = new User();

module.exports = class UserService {
    async check_user(name) {
        return await librarian.query().findOne({ name: name });
    }

    async findAll(txn) {
        return await librarian.query(txn);
    }

    async createUsers_librarian(details) {
        return await librarian.query().insert(details);
    }

    async updateByEmail(name, details) {
        console.log(details);
        const updateRiddles = await librarian.query().findOne({ name: name });
        const updated = await updateRiddles.$query().patch(details);
        return updated;
    }

    async deleteBook_by_name(name) {
        console.log("sdfghjk");
        const deleteRiddles = await librarian.query().findOne({ name: name });
        const deletes = await deleteRiddles.$query().delete();
        return deletes;
    }

    async find(txn) {
        const data = await student
            .query(txn)
            .withGraphFetched("librarian")
            .withGraphFetched("students");
        return data;
    }
};