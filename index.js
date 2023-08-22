const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}))
const { create, findOne, update, findAll } = require ('./dal')

app.post("/login/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await findOne(email)
  console.log(user);
  if (!user) {
    return res.send(false)
  }
  if (password === user.password) {
    return res.json(user);
  } else {
    return res.send(false)
  }
});

app.get("/user/:email", async (req, res) => {
    const email = req.params.email;
    const user = await findOne(email);
    console.log(email);
    console.log(user);
    return res.json(user);
});

app.put("/withdraw/", async (req, res) => {
    const email = req.body.email;
    const amount = req.body.amount;
    const user = await findOne(email)
    if (isNaN(amount)) {
        return res.send("Amount is not equal to a number.");
    }
    if (user.balance - amount < 0) {
        return res.send("Overdraft not allowed.");
    };
   update(user, amount, "withdraw"); 
   return res.send("You have successfully withdrawn from your account: " + amount);
})

app.put("/deposit/", async (req, res) => {
    const email = req.body.email;
    const amount = req.body.amount;
    const user = await findOne(email)
    if (isNaN(amount)) {
        return res.send("Amount is not equal to a number.");
    }
    update(user, amount, "deposit"); 
   return res.send("You have successfully deposited into your account: " + amount);
})

app.post("/create-account/", async (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (password.length < 8) {
        return res.send("Error");
    }
    console.log(name, email, password); 
    create(name, email, password)
    res.send("You have successfully created an account.");
 })

app.get("/alldata", async (req, res) => {
   const users = await findAll();
    return res.json(users)
})

 app.listen(4000, () => {
 })

// const User = require("./user");
//const mongoose = require("mongoose");
//mongoose.connect("mongodb://datastore:27017/");

//client = MongoClient('mongodb://datastore:27017/dockerdemo')
//mongoose.connect(`mongodb+srv://elenigray81:Password1@cluster0.iewyhff.mongodb.net/?retryWrites=true&w=majority`)
//  app.get("/", (req, res) => {
//     res.send("You have successfully created an account.");
//  })
//  history: [
//     {timestamp: new Date(), type: "deposit", amount: 100, "balance": 100}
//   ]


// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     balance: {
//         type: Number,
//         default: 0
//     },
//     history: [
//         mongoose.Schema.Types.Mixed
//     ]
// })

//const User = mongoose.model("User", userSchema);
//  history: [
//     {timestamp: new Date(), type: "deposit", amount: 100, "balance": 100}
//   ]
