const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const fs =require('fs')
const jwt =require('jsonwebtoken')
const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.listen(3001, () => {
  console.log("Running");
});


const KEY= 'user-auth'
app.post('/api',(req,res)=>{
    const email = req.body.email
    const pass = req.body.password
    console.log(email,pass)
    
    fs.readFile("./user.json", "utf8", (err, jsonString) => {
        const user =JSON.parse(jsonString)
        if (user.email == email&& user.password==pass) {
          const token = jwt.sign({email:user.email},KEY)
            res.send({'msg':'success',token})
            console.log('success')
        }else{
            res.send('failed')
            console.log('failed')
        }
       
      });
})