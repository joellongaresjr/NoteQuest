const express = require("express"); 
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // using uuid to generate unique id
const PORT = process.env.PORT || 3001; //

const app = express();

// // Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Route routtteeeee (jerome voice)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
// Route for "/notes" sending notes to "public/notes.html"
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// api route to get (fetch) all notes from db.json
app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    err ? console.log(err) : res.json(JSON.parse(data));
  });
});

// Route for Post request for adding new notes
app.post("/api/notes", (req, res) => {
  let title = req.body.title; // extracting note title from request body 
  let text = req.body.text; // extracting note text from request body
  let newNote = { title, text, id: uuidv4() }; // applying uuid npm package to give each note a unique id

  // reading the file in db.json
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Error reading db.json:", err);
      res.status(500).json({ err: "Failed to read notes from database." });
      return;
    }
    let currentNotes = JSON.parse(data); //json parse existing data into an array 
    currentNotes.push(newNote); // add new notes (push)
    fs.writeFile("db/db.json", JSON.stringify(currentNotes, null, 4), (err) => {
      //turnary: shoutout my tutor for this way of code making it look cleaner/pretter! definetly gonna be using this more often
      //writing updated array back to our json file (added null,4) to organize our db.json to look more readable to acquire id
      err
        ? console.log("Failed to write note to database", err)
        : console.log("New Note has been saved!");
    });

    res.sendFile(path.join(__dirname, "public/notes.html")); // sending our responses to notes.html
  });
});

app.delete("/api/notes/:id", (req, res) => {
  // creating a new route through notes with our ':id' parameters of our db.json
  const deleteId = req.params.id; // extracting Id parameter assigning it variable 'deleteId' , 
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Error reading db.json", err);
      res
        .status(500)
        .json({ error: "Failed to read notes from the database." });
      return;
    }

    let currentNotes = JSON.parse(data); // parasing the existing db.json data into an array

    for (let i = 0; i < currentNotes.length; i++) {
      // loop through array to identifying the specific ID
      if (currentNotes[i].id === deleteId) {
        currentNotes.splice(i, 1); // splice method to modify array
        break;
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

//catching wild card routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} `)
);

