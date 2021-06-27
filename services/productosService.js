require('dotenv').config();
const dbConn = require('../database');

exports.createProducto = (producto) => {
  const {
    fecha,
    disponible,
    descripcionCatalogo,
    descripcionCompleta,
    revisor,
    duenio
  } = producto

  const sql = `
    INSERT INTO productos (fecha, disponible, descripcionCatalogo, descripcionCompleta, revisor, duenio)
    VALUES ('${fecha}', '${disponible}', '${descripcionCatalogo}', '${descripcionCompleta}', '${revisor}', '${duenio}');
 `

  return dbConn.service(sql)
};

/**
 * @description obtiene todos los productos por cliente
 * @param idCliente - id del cliente
 */
exports.getAllProductsByIdClient = (idCliente) => {
  const sql = `
  SELECT
    p.identificador         idProducto,
    p.fecha,
    p.descripcionCatalogo,
    p.descripcionCompleta,
    p.revisor,
    p.duenio, 
    ps.estado
  FROM productoSeguimiento ps
    JOIN productos p ON p.identificador = ps.producto
  WHERE p.duenio = ${idCliente};
  `

  return dbConn.service(sql);
}

