const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const generateHTML = require("./generateHTML.js");

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your Github username?",
            name: "username"
        }, {
            type: "list",
            message: "What is your favorite color?",
            choices: ["red", "green", "blue", "pink"],
            name: "favColor"
        }
    ])
    .then(answers => {
        const username = answers.username;
        const color = answers.favColor;
        const userFileName = username + ".html";
       

        axios
            .get(`https://api.github.com/users/${username}`)
            .then(function (response) {
                
                  let fileData = generateHTML(response, color);
                   writeFile(userFileName,fileData)
            });

    })

function writeFile(filename, data) {
        fs.writeFile(filename, data, function (err) {
            if (err) {
                return (console.log("Error here: ", err));
            }        
    });
}
