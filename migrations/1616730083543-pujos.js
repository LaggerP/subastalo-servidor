'use strict'
const dbConnection = require('../database')
const sql = require ('mssql');


module.exports.up = function (next) {
  const sqlQuery = `create table pujos(
    identificador int not null identity,
    asistente int not null,
    item int not null,
    importe decimal(18,2) not null constraint chkI check (importe > 0.01),
    ganador varchar(2) constraint chkG check (ganador in ('si','no')) default 'no',
    constraint pk_pujos primary key (identificador),
    constraint fk_pujos_asistentes foreign key (asistente) references asistentes,
    constraint fk_pujos_itemsCatalogo foreign key (item) references itemsCatalogo
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
