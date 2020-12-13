const Users = require('../models/all_models').students
    // const Users = new Users_s();


module.exports = class UserService {
    async findAll(txn) {
        return await Users.query(txn);
    }
    async createUsers_student(details) {
        return await Users.query().insertGraph(details);
    }

    async find_By_Id(id) {
        return await Users.query().findById(id);
    }
    async check_user(email) {
        return await Users.query().findOne({ email: email });
    }

    async find_by_name(name) {
        return await Users.query().findOne({ name: name });
    }

    async updateByEmail(email, details) {
        console.log(details);
        const updateRiddles = await Users.query().findOne({ email: email })
        const updated = await updateRiddles.$query().patch(details)
        return updated;
    }

    async delete_by_name(name) {
        console.log("sdfghjk");
        const deleteRiddles = await Users.query().findOne({ name: name });
        const deletes = await deleteRiddles.$query().delete()
        return deletes;
    }
}