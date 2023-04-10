const express = require('express');
const fs = require('fs');
const path = require('path');
const randomId = require('random-id');

let length = 30;
let pattern = 'aA0';

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true}));
app.use(express.json())
app.use(express.static(path.join(__dirname, '/Develop/public')));

//request data db.json file
app.get('/api/notes', function (req, res) {
    let data = fs.readFileSync('./Develop/db/db.json', 'utf8');
        let notes = JSON.parse(data);
        res.json(notes);

});

app.post('/api/notes', (req, res) => {

    let notesJSON = fs.readFileSync('./Develop/db/db.json', 'utf8');
    let notes = JSON.parse(notesJSON);
    let addNote = {
        "id": randomId(length, pattern),
        "title": req.body.title,
        "text": req.body.text
    }
    notes.push(addNote);
    
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes), 'utf8');
    res.json(notes);
 
});

app.delete('/api/notes/:id', function (req, res) {
    let deleteEl = req.params.id;
    let noteEl = JSON.parse(fs.readFileSync('./Develop/db/db.json', 'utf8'));
    
    // for (let i = 0; i < noteEl.length; i++){
    //     if(deleteEl === noteEl[i].id) {
    //         noteEl.splice(noteEl.indexOf(noteEl[i]), 1);
    //         fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteEl), 'utf8');
    //         res.json(noteEl);
    //     }
    // }

    for (let index in noteEl){
        if (deleteEl === noteEl[index].id) {
            noteEl.splice(index, 1);
            fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteEl), 'utf8');
            res.json(noteEl);
        }
    }
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