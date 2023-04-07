const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true}));
app.use(express.json())
app.use(express.static(path.join(__dirname, '/Develop/public')));

//request data db.json file
app.get('/api/notes', function (req, res) {
    let data = fs.readFileSync('./Develop/db/db.json', 'utf8');
        JSON.parse(JSON.stringify(data));
        let notes = JSON.parse(data);
        res.json(notes);

});

app.post('/api/notes', (req, res) => {

    let notesJSON = fs.readFileSync('./Develop/db/db.json', 'utf8');
    let notes = JSON.parse(notesJSON);
    let addNote = {
        "id": req.body.title + req.body.text,
        "title": req.body.title,
        "text": req.body.text
    }
    console.log(JSON.stringify(req.body))
    notes.push(addNote);
    
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes), 'utf8');
    res.json(notes);
 
});


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