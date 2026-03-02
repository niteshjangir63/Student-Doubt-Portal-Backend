require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const connectDB = require("./initDb");


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB();

const doubts = require("./routes/doubts.route")
const auth = require("./routes/auth.route");
const otp = require("./routes/otp.route");
const passwordUpdate = require("./routes/passwordUpdate.route");

app.use("/auth", auth);
app.use("/doubts", doubts);
app.use("/",otp)
app.use("/",passwordUpdate)

app.listen(PORT,()=>{

    console.log("app is listening..")
})


