//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var messages = [];
var message = "";

app.get("/", function(req, res)
{
    // res.sendFile(__dirname + "/home.html");
    res.render("home", {chat: messages});
});

app.post("/", function(req, res)
{
    message = req.body.message.toLowerCase();
    messages.push(message);

    // if(message.includes("linkedin"))
    // {
    //     // res.redirect("https://www.linkedin.com/in/patrik-schwartz-907b71189/");
    // }
    // else if (message.includes("facebook") || message.includes("fb"))
    // {
    //     // res.redirect("https://www.facebook.com/patrik.schwartz.94");
    // }
    // else if(message.includes("email") || message.includes("e-mail") || message.includes("mail"))
    // {
    //     // res.redirect("mailto:patosch007%40gmail.com?subject=Master%20of%20discipline");
    // }

    console.log(message);
    res.redirect("/");
});

app.listen(3001, function()
{
    console.log("Server is running on port 3001");
});
