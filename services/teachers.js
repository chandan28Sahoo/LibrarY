const Users = require('../models/all_models').teachers
    // const Users = new User();

module.exports = class UserService {
    async findAll(txn) {
        return await Users.query(txn);
    }
    async createUsers_teacher(details) {
        return await Users.query().insertGraph(details);
    }

    async find_By_Id(id) {
        return await Users.query().findById(id);
    }

    async check_user(email) {
        return await Users.query().findOne({ email: email });
    }

    async updateByEmail(email, details) {
        console.log(details);
        const updateRiddles = await Users.query().findOne({ email: email })
        const updated = await updateRiddles.$query().patch(details)
        return updated;
    }

    async deleteBook_by_name(name) {
        const deleteRiddles = await Users.query().findOne({ name: name });
        const deletes = await deleteRiddles.$query().delete()
        return deletes;
    }
}