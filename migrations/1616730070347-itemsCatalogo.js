'use strict'
const dbConnection = require('../database')
const sql = require ('mssql');


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
