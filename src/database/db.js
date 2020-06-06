//Import the SQLite3 dependence
const sqlite3 = require("sqlite3").verbose();

//Create object that will make alterations on database
const db = new sqlite3.Database("./src/database/database.db");

//Exports object
module.exports = db
//Use the database object
// db.serialize(() => {
//   /* With SQL commands, i will: */

//   //Create a table
//   db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             adress TEXT,
//             adress2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `);

//   //Insert data
//   const query = `
//     INSERT INTO places (
//         image,
//         name,
//         adress,
//         adress2,
//         state,
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);
// `;
//   const values = [
//     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
//     "Papersider",
//     "Guilherme Gemballa, Jardim América",
//     "N° 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Resíduos eletrônicos, lâmpadas",
//   ];

//   function afterInsertData(err) {
//     if(err) {
//         return console.log(err)
//     }

//     console.log("Sucefully inserted data")
//     console.log(this)
//   }

//   db.run(query, values, afterInsertData)

  //Consult data
//   db.all(`SELECT name FROM places`, function(err, rows) {
//     if(err) {
//         return console.log(err)
//     }
    
//     console.log("Here is your data")
//     console.log(rows)
//   })

  //Delet data
//   db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
//     if(err) {
//         return console.log(err)
//     }

//     console.log("Sucefully deleted data")
//   })
// });