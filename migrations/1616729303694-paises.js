'use strict'
const dbConnection = require('../database')
const sql = require ('mssql');

module.exports.up = function (next) {
  const sqlQuery = `create table paises(
    numero int not null,
    nombre varchar(250) not null,
    nombreCorto varchar(250) null,
    capital varchar(250) not null,
    nacionalidad varchar(250) not null,
    idiomas varchar(150) not null,
    constraint pk_paises primary key (numero)
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