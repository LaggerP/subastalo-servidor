'use strict'
const dbConnection = require('../database')
const sql = require ('mssql');

module.exports.up = function (next) {
  const sqlQuery = `create table personas(
    identificador int not null identity,
    documento varchar(20) not null,
    nombre varchar(150) not null,
    direccion varchar(250),
    estado varchar(15) constraint chkEstado check (estado in ('activo', 'incativo')),
    foto varbinary(max)
    constraint pk_personas primary key (identificador)
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
