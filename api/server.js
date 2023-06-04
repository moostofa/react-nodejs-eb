const express = require('express');
const path = require('path');
const app = express(),
  bodyParser = require("body-parser");
port = 8080;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/my-app/build')));

app.post("/api/rentals", (req, res) => {
  const db = {name: "mysql.db", save: (data) => console.log(`Saving to Renting_History table: ${data}`)}
  db.save(req.body)
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});