'use strict'
const dbConnection = require('../database')
const sql = require ('mssql');


module.exports.up = function (next) {
  const sqlQuery = `create table subastadores(
    identificador int not null,
    matricula varchar(15),
    region varchar(50),
    constraint pk_subastadores primary key (identificador),
    constraint fk_subastadores_personas foreign key (identificador) references personas
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
