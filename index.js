const express = require("express");
const expressRateLimit = require("express-rate-limit");
const app = express();
const fs = require("fs");

// Avoid somebody spamming the server and causing the quotes.txt to be 20gb :(
const rateLimit = expressRateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10 // limit each IP to 10 requests per windowMs
});

app.use(express.static("public/"))
app.use(express.json())
// Don't ratelimit the public folder, only the API
app.use(rateLimit);

app.get("/projects", (req, res) => {
    const projects = []
    projects.push({
        name: "GChat",
        git: "https://github.com/hinoobers/gchat",
        preview: "https://opengraph.githubassets.com/8527dcd5bff03208e5ceeb675b11290667ef19090ea12cacbe89f4422806180a/hinoobers/gchat"
    }, {
        name: "Doubloon calculator",
        git: "https://github.com/hinoobers/doublooncalc",
        preview: "https://opengraph.githubassets.com/8527dcd5bff03208e5ceeb675b11290667ef19090ea12cacbe89f4422806180a/hinoobers/doublooncalc"
    })
    res.json(projects);
})

// Log to Console & Store to file incase of server crash
// Could have some sort of fancy setup where it automatically sends me a email or whatever, but this should work fine for now
// This is currently sort of a manual setpu
app.post("/quote", (req, res) => {
    const {
        message, email
    } = req.body;

    if(!message || !email) {
        // Don't spam the console with invalid requests
        return res.status(400).json({error: "No message/email provided"});
    }

    if(message.trim().length < 10 || !message.includes(" ")) {
        return res.status(400).json({error: "Invalid message"});
    }

    if(/^(.)\1+$/.test(message.trim())) {
        return res.status(400).json({error: "Spam detection triggered"});
    }

    // Do some verification for email
    if(!email.includes("@") || !email.includes(".") || email.length < 5) {
        return res.status(400).json({error: "Invalid email"});
    }

    console.log(`Message: ${message}, Email: ${email}`);

    fs.appendFile("quotes.txt", `Message: "${message}", Email: "${email}"\n`, (err) => {
        if(err) {
            console.error(err);
        }
    })

    return res.json({message: "Message sent"});
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})