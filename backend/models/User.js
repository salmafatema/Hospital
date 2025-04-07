const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // to avoid duplicate accounts
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true }); // optional: adds createdAt & updatedAt

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
