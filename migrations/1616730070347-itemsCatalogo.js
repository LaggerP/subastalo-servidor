'use strict'
const dbConn = require('../database')


module.exports.up = function (next) {
  const sqlQuery = `create table itemsCatalogo(
    identificador int not null identity,
    catalogo int not null,
    producto int not null,
    precioBase decimal(18,2) not null constraint chkPB check (precioBase > 0.01),
    comision decimal(18,2) not null constraint chkC check (comision > 0.01),
    subastado varchar(2) constraint chkS check (subastado in ('si','no')),
    constraint pk_itemsCatalogo primary key (identificador),
    constraint fk_itemsCatalogo_catalogos foreign key (catalogo) references catalogos,
    constraint fk_itemsCatalogo_productos foreign key (producto) references productos
  )`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
