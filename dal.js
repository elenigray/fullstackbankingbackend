const mongoose = require('mongoose');
const User = require('./user').User;

// connect to mongo
mongoose.connect("mongodb://datastore:27017/");
//mongoose.connect(`mongodb+srv://elenigray81:Password1@cluster0.iewyhff.mongodb.net/?retryWrites=true&w=majority`)

// create user account using the collection.insertOne function
async function create(name, email, password) {
    const user = new User({name, email, password})
    await user.save();
    return user;
}

// find user account 
async function findOne(email) {
    console.log(User);
    return await User.findOne({email})
}

// update - deposit/withdraw amount
async function update(user, amount, type) {
    if(type === "withdraw") {
        user.balance = user.balance - amount
    } else if(type === "deposit") {
        user.balance = user.balance + amount
    }
    user.history.push({
     timestamp: (new Date()),
     type: type,
     amount: amount,
     balance: user.balance,
    })
    await user.save();
}

// return all users by using the collection.find method
async function findAll() {
    return await User.find();
}


module.exports = { create, findOne, update, findAll };