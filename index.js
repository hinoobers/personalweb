const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.static("public/"))
app.use(express.json())

app.get("/projects", (req, res) => {
    const projects = []
    projects.push({
        name: "BedWars",
        git: "https://github.com/hinoobers/BedWars",
        preview: "https://opengraph.githubassets.com/8527dcd5bff03208e5ceeb675b11290667ef19090ea12cacbe89f4422806180a/hinoobers/BedWars"
    }, {
        name: "Doubloon calculator",
        git: "https://github.com/hinoobers/doublooncalc",
        preview: "https://opengraph.githubassets.com/8527dcd5bff03208e5ceeb675b11290667ef19090ea12cacbe89f4422806180a/hinoobers/doublooncalc"
    })
    res.json(projects);
})

// Log to Console & Store to file incase of server crash
app.post("/quote", (req, res) => {
    const {
        message, email
    } = req.body;

    if(!message || !email) {
        // Don't spam the console with invalid requests
        return res.status(400).json({error: "No message/email provided"});
    }

    if(message.length < 10 || !message.includes(" ")) {
        return res.status(400).json({error: "Invalid message"});
    }

    console.log(`Message: ${message}, Email: ${email}`);
    res.json({message: "Message sent"});


})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})