//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const open = require("open");
const lodash = require("lodash");
const stringShortener = require(__dirname + "/string_shorter.js");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

var customer_messages = [];
var customer_message = "";
var customer_email = "";

var my_messages = [];
var my_message = "";

var chat_length = 0;
var newsletter_time = 0;

var random_messages = [
    "More about me? I can speak German and am learning French",
    "Do you wanna know more? I really like to draw, but only with pencil.",
    "You know what? I can't sing and play music instrument, but I would really like to do some music.",
    "Still want more? Okay, I like playing ice hockey. My favorite team is San Jose Sharks.",
    "Do you want to know, how old I am? Little hint: I was born in 1997.",
    "Are you from Slovakia? No? Because I am.",
    "I'm hungry. I would eat some pizza. That's my favorite food."
];

app.get("/", function(req, res) {
    // res.sendFile(__dirname + "/home.html");
    res.render("home", {
        customer_chat: customer_messages,
        my_chat: my_messages
    });
});

app.post("/", function(req, res) {

    chat_length++;

    customer_message = req.body.message.toLowerCase();
    customer_messages.push(customer_message);

    if(newsletter_time === 0)
    {
        if (customer_message.includes("linkedin")) {
            open('https://www.linkedin.com/in/patrik-schwartz-907b71189/', function(err) {
                if (err) throw err;
            });
            my_message = "Check the new tab with my Linkedin account";
        } else if (customer_message.includes("facebook") || customer_message.includes("fb")) {
            open('https://www.facebook.com/patrik.schwartz.94', function(err) {
                if (err) throw err;
            });
            my_message = "Check the new tab with my Facebook account";
        } else if (customer_message.includes("instagram") || customer_message.includes("twitter")) {
            my_message = "Nope. I don't have something like that. So far.";
        } else if (customer_message.includes("email") || customer_message.includes("e-mail") || customer_message.includes("mail")) {
            // res.redirect("mailto:patosch007%40gmail.com?subject=Master%20of%20discipline");
            my_message = "Here is my email: patrik.schwartz@protonmail.com";
        } else {
            if(chat_length != 3)
            {
                my_message = random_messages[Math.floor(Math.random() * 7)];
            }
            else
            {
                my_message = "You know what? Life Lifter has also newsletter? Do you want to sign up for them? (Y/N). You will get the best articles for you.";
                newsletter_time = 1;
            }
        }
    }
    else if(newsletter_time === 1)
    {
        if(customer_message.includes("y"))
        {
            my_message = "Amazing. So please write down your email.";
            newsletter_time = 2;
        }
        else
        {
            my_message = "That's shame. Maybe next time.";
            newsletter_time = 0;
        }
    }
    else
    {
        if(customer_message.includes("@") && customer_message.includes("."))
        {
            customer_email = customer_message.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
            console.log("His email is " + customer_email);
            // TODO: send email in the mailchimp database
            my_message = "Thanks. Awaits awesome content.";
            newsletter_time = 0;
        }
        else
        {
            my_message = "Ou, this doesn't looks like email. Try again.";
            newsletter_time = 2;
        }
    }


    my_messages.push(my_message);

    res.redirect("/");
});

app.listen(3001, function() {
    console.log("Server is running on port 3001");
});
