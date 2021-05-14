const express = require('express');

const app = express()

app.get('/', (req, res) => {
    res.send("Hi there rohith mahn");
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
});