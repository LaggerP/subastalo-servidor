'use strict'
const dbConnection = require('../database')
const sql = require ('mssql');


module.exports.up = function (next) {
  const sqlQuery = `create table productos(
    identificador int not null identity,
    fecha date,
    disponible varchar(2) constraint chkD check (disponible in ('si','no')),
    descripcionCatalogo varchar(500) null default 'No Posee',
    descripcionCompleta varchar(300) not null,
    revisor int not null,
    duenio int not null, 
    constraint pk_productos primary key (identificador),
    constraint fk_productos_empleados foreign key (revisor) references empleados(identificador),
    constraint fk_productos_duenios foreign key (duenio) references duenios(identificador)
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
