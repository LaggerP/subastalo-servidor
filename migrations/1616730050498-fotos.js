'use strict'
const dbConnection = require('../database')
const sql = require ('mssql');


module.exports.up = function (next) {
  const sqlQuery = `create table fotos(
    identificador int not null identity,
    producto int not null,
    foto varbinary (max) not null,
    constraint pk_fotos primary key (identificador),
    constraint fk_fotos_productos foreign key (producto) references productos(identificador)
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
