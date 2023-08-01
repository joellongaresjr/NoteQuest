const fs = require("fs");
const express = require("express");
const apiRouter = express.Router();
const { v4: uuidv4 } = require("uuid");

// GET /api/notes
// should return all notes
apiRouter.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "Failed to read notes from the database." });
    } else {
      const parsedData = JSON.parse(data);
      res.json(parsedData);
    }
  });
});

// POST /api/notes
apiRouter.post("/api/notes", (req, res) => {
  const title = req.body.title;
  const text = req.body.text;
  const newNote = { title, text, id: uuidv4() };

  // reading the file
  fs.readFile("/.db/db.json", "ut-8", (err, data) => {
    const existingNotes = JSON.parse(data); //json parse existing
    existingNotes.push(newNote); // add new notes (push)
    fs.writeFile("/.db/db.json", JSON.stringify(existingNotes), (err) => {
      //turnary
      err
        ? console.log("this the error", err)
        : console.log("New Note has been saved!");
    });

    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
  // parsing the file into an array
  // pushing new note to array
  // write file
});

apiRouter.delete("", (req, res) => {
  // read file
  // parse into array
  // filer out notes with the Id that would be passed in
  // write to file once it's been filtered out
});
// add a new note to db.json

module.exports = apiRouter;
