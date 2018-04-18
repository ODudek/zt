const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    login: String,
    password: String
});

module.exports = mongoose.model("User", UsersSchema);
