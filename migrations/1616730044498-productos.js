 'use strict'
const dbConn = require('../database')


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

 
  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
