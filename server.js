const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const PORT = process.env.PORT || 3001;

const app = express();

// // Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    err ? console.log(err) : res.json(JSON.parse(data));
  });
});

// POST /api/notes
app.post("/api/notes", (req, res) => {
  let title = req.body.title;
  let text = req.body.text;
  let newNote = { title, text, id: uuidv4() };

  // reading the file
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Error reading db.json:", err);
      res.status(500).
      json({ err: "Failed to read notes from database." });
      return;
    }
    let currentNotes = JSON.parse(data); //json parse existing
    currentNotes.push(newNote); // add new notes (push)
    fs.writeFile("db/db.json", JSON.stringify(currentNotes, null, 4), (err) => {
      //turnary
      err
        ? console.log("Failed to write note to database", err)
        : console.log("New Note has been saved!");
    });

    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
  // parsing the file into an array
  // pushing new note to array
  // write file
});


 
app.delete("/api/notes/:id", (req, res) => { // creating a new route through notes with our ':id' parameters of our db.json
  const deleteId = req.params.id; // extracting Id parameter assigning it variable 'deleteId'

  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Error reading db.json", err);
      res
        .status(500)
        .json({ error: "Failed to read notes from the database." });
      return;
    }

    let currentNotes = JSON.parse(data);

    for (let i = 0; i < currentNotes.length; i++) { // loop through array to identifying the specific ID
      if (currentNotes[i].id === deleteId) { 
        currentNotes.splice(i, 1); // splice method to modify array 
        return; 
      }
    }

    fs.writeFile("db/db.json", JSON.stringify(currentNotes, null, 4), (err) => {
      err
        ? console.log("Error deleting note:", err)
        : console.log("Note has been deleted!");

      res.json({ message: "Note deleted successfully." });
    });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} `)
);
