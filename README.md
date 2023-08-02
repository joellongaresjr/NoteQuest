# NoteQuest
## Description 
Welcome to "NoteQuest"! This is a simple note-taking application that will allow users to create, save, and delete notes. Users will have the opportunity to stores these notes and access them at any given moment! 

Click on the delployed link from Heroku to embark on your Quest on Note-taking. 



![Quest.logo](./images/QUEST%20PICUTRE.png)



## Technology Used
* Node.js
* Express
* FS (File System)
* UUID npm package
* Disclaimer: all these technologies/packages must be installed within your CLI before you can experience this application 

## Installation
1. Clone repo 
2. Navigate in your CLI to acces
3. Install npm & all the necessary pacakges before deployment

## Code Highlights

Here is a snippet for when I used the turnary way of writing code within my fs.writeFile
I also broadcast the npm package (uuid) in this function
![Turnary/uuid.sample](./images/Turnary%20Example.png)


## Learning Points

* UUID an Npm built in package allowed me to execute this assignment. Using this package allowed me give each note a unique id and calling on that particular note that the user inputs to our database (db.json)
* (Turnary) using this method instead of (if/else) by default makes everything look prettier and saving space within our code. My tutor from the Berkley Coding Extension shared this valuable insight with me, and I'm grateful for the knowledge they imparted. Implementing this approach proves advantageous in the long run, as it minimizes code space usage. In real-world scenarios, optimizing code space becomes crucial, especially when dealing with databases and constant information being passed on. 