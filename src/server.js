const express = require("express");
const server = express();

//Get database
const db = require("./database/db.js");

/* Config public paste */
server.use(express.static("public"));

//Turn on use of req.body
server.use(express.urlencoded({extended: true}))

/* Using template engine */
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

/* Config ways for my app */

// Home
//req = requisition
//res = awnser
server.get("/", (req, res) => {
  return res.render("index.html", {
    title: "Seu marketplace de coleta de resíduos",
  });
});

server.get("/create-point", (req, res) => {
  //console.log(req.query)

  return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
  //req.body: form's body
  //console.log(req.body)

  //Insert data on database
  const query = `
    INSERT INTO places (
        image,
        name,
        adress,
        adress2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`
  const values = [
    req.body.image,
    req.body.name,
    req.body.adress,
    req.body.adress2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if(err) {
        return console.log(err)
    }

    console.log("Sucefully inserted data")
    console.log(this)

    return res.render("create-point.html", {saved: true})
  }

  db.run(query, values, afterInsertData)
})



server.get("/search-results", (req, res) => {
  const search = req.query.search

  if(search == "") {
    //Undefined search
    return res.render("search-results.html", {total: 0})
  }

  //Get data from database
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      console.log(err);
      return res.send("Erro no cadastro")
    }
    const total = rows.length
    //Show the HTML page with data of database
    return res.render("search-results.html", {places: rows, total: total});
  })
})

//Turn on server
server.listen(3000);
