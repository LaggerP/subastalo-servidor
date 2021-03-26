'use strict'
const dbConnection = require('../database')
const sql = require ('mssql');


module.exports.up = function (next) {
  const sqlQuery = `create table sectores(
    identificador int not null identity,
    nombreSector varchar(150) not null,
    codigoSector varchar(10) null,
    responsableSector int null,
    constraint pk_sectores primary key (identificador),
    constraint fk_sectores_empleados foreign key (responsableSector) references empleados
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
