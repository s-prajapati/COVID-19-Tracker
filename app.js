const { response } = require("express");
const express = require("express");
const app = express();
const path = require('path');
const request = require("request");
const ejsMate = require('ejs-mate');

app.set("view engine","ejs");
app.engine('ejs',ejsMate);
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    request(`https://api.covid19india.org/data.json`,(error,response,body)=>{
        if(!error && response.statusCode==200){
            const all_data = JSON.parse(body);
            const data = all_data.statewise; 
            console.log(data)
            res.render("results",{data:data});
            
        }
    });

});


app.listen(3000,()=>{
    console.log("Server is started");
});