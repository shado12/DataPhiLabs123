var sqlite3 = require('sqlite3').verbose();
var fs = require('fs'); 

var DB_NAME = 'dataphi.db';
function getDB() {
  if (!fs.existsSync(DB_NAME)) {
    init();
  } 
  return new sqlite3.Database(DB_NAME);
}

function init() {
  var createPatients = `CREATE TABLE IF NOT EXISTS patient ( \
  first_name text NOT NULL, \
  last_name text NOT NULL, \
  gender text NON NULL, \
  dob INTEGER NOT NULL, \
  phone INTEGER NON NULL UNIQUE)`;

  var db = new sqlite3.Database(DB_NAME);
  db.run(createPatients);
  db.close();
}

module.exports = {
  insertData: function(data) {
    var sql = 'INSERT INTO patient VALUES (?,?,?,?,?)';
    var db = getDB();
    var stmt = db.prepare(sql);
    stmt.run(data.firstname, data.lastname, data.gender, data.dob, data.phone);
    stmt.finalize();
    db.close();
  },
  getPatients: function(callback) {
    var sql = 'SELECT * from patient';
    var db = getDB();
    db.all(sql, function(err, rows){
      callback(rows);
    });
  },
  initialize: function() {
    init();
  }
}
