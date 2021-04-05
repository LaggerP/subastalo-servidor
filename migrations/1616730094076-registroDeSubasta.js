'use strict'
const dbConn = require('../database')


module.exports.up = function (next) {
  const sqlQuery = `create table registroDeSubasta(
    identificador int not null identity,
    subasta int not null,
    duenio int not null,
    producto int not null,
    cliente int not null,
    importe decimal(18,2) not null constraint chkImportePagado check (importe > 0.01),
    comision decimal(18,2) not null constraint chkComisionPagada check (comision > 0.01),
    constraint pk_registroDeSubasta primary key (identificador),
    constraint fk_registroDeSubasta_subastas foreign key (subasta) references subastas,
    constraint fk_registroDeSubasta_duenios foreign key (duenio) references duenios,
    constraint fk_registroDeSubasta_producto foreign key (producto) references productos,
    constraint fk_registroDeSubasta_cliente foreign key (cliente) references clientes
  )`;

  
  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
