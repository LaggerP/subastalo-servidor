'use strict'
const dbConnection = require('../database')
const sql = require ('mssql');


module.exports.up = function (next) {
  const sqlQuery = `create table empleados(
    identificador int not null,
    cargo varchar(100),
    sector int null,
    constraint pk_empleados primary key (identificador)
  )`;

  sql.connect(dbConnection, (err) => {
    if (err) console.log(err);

    console.log('Connection to DB established');

    let request = new sql.Request();
    request.query(sqlQuery, (err, result) => {
      if (err)
        console.log(err);
      else
        next(); console.log(result)
    })

  });
}

module.exports.down = function (next) {
  next()
}
