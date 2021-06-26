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
