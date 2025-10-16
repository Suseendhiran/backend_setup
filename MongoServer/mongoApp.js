
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import User from "./Models/UserModel.js"


// Replace the uri string with your connection string
const uri = "mongodb+srv://learning:IndiumSql!135@cluster0.dpkff5i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
mongoose.connect(uri,{
    dbName:"join_us"
}).then(async() => {
    console.log("connected mongoose")
})
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3002, () => {
    console.log("Mongo server started at 3002")
});

app.get("/",async(_, res) => {
    const users = await User.find()
    res.render("home",{
        count:users.length
    })
})

app.post("/register",async (req,res) => {
    await User.create({email:req.body.email,name:req.body.name}).then(() => {
        // console.log("createres", res);
        res.redirect("/");
    }).catch(err => console.log("create err",err))
})


async function populateTest(){
   const populate =  await User.find({name:"hasFriend"}).populate("friend");
   console.log('Populate',populate[0])
}

populateTest()