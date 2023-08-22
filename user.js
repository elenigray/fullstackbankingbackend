const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    balance: {
        type: Number,
        default: 0
    },
    history: [
        mongoose.Schema.Types.Mixed
    ]
})

const User = mongoose.model("User", userSchema);
module.exports = {User}