'use strict'
const dbConn = require('../database')
const sql = require ('mssql');


module.exports.up = function (next) {
  const sqlQuery = `create table clientes(
    identificador int not null,
    numeroPais int,
    admitido varchar(2) constraint chkAdmitido check(admitido in ('si','no')),
    categoria varchar(10) constraint chkCategoria check (categoria in ('comun', 'especial', 'plata', 'oro', 'platino')),
    verificador int not null,
    constraint pk_clientes primary key (identificador),
    constraint fk_clientes_personas foreign key (identificador) references personas,
    constraint fk_clientes_empleados foreign key (verificador) references empleados (identificador),
    constraint fk_clientes_paises foreign key (numeroPais) references paises (numero)
  )`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
