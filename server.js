const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true}));
app.use(express.json())
app.use(express.static(path.join(__dirname, '/Develop/public')));

//HTML ROUTING 
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
});
 
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
})
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.listen(PORT, () => {
    console.log("Application running at port: " + PORT)

});