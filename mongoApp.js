const { MongoClient } = require("mongodb");
var express = require('express');
var bodyParser = require('body-parser');

// Replace the uri string with your connection string
const uri = "mongodb+srv://learning:IndiumSql!135@cluster0.dpkff5i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3001, function() {
    console.log('Server started on port 3001');
});



const client = new MongoClient(uri);
client.connect().then(async client => {
    console.log("Connnecteddb")
}).catch(err => {
    console.log("Error connecting client",err)
})
const db = "join_us"
const collection = "users"

app.get("/",async (_,res) => {
    const users = await client.db(db).collection(collection).find().toArray()
    console.log("results",users)
    res.render("home",{
        count:users.length
    })
   // res.send(results)
})

app.post("/register",(req,res) => {
    var q = 'INSERT INTO users_no_index SET ?';
    let values = {
        email: req.body.email
    }
    const dbResponse = client.db(db).collection(collection).insertOne({
        ...values
    })
    // connection.query(q, values, function(err, result) {
     console.log(dbResponse);
    // console.log("registertest",result);
     res.redirect("/")
    // });
})

app.get("/",(_,res) => {
    const query = 'SELECT COUNT(*) AS count FROM users'
    connection.query(query,(err,results) => {
        if(err) throw JSON.stringify(err)
        console.log("results",results[0])
        res.render("home",{
            count:results[0].count
        })
    })
    // var data = [];
    // for(var i = 0; i < 10000; i++){
    //     data.push([
    //         faker.internet.username(),
    //         i
    //     ]);
    // }
    // res.send(data)
    // var q = 'INSERT INTO users_with_index (name, age) VALUES ?';
    // connection.query(q, [data], function(err, result) {
    //   console.log("error",err);
    //   console.log("response",result);
    // });
        
})