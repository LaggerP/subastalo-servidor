'use strict'
const dbConnection = require('../database')
const sql = require ('mssql');


module.exports.up = function (next) {
  const sqlQuery = `create table asistentes(
    identificador int not null identity,
    numeroPostor int not null,
    cliente int not null,
    subasta int not null
    constraint pk_asistentes primary key (identificador),
    constraint fk_asistentes_clientes foreign key (cliente) references clientes,
    constraint fk_asistentes_subasta foreign key (subasta) references subastas
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
