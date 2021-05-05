require('dotenv').config()
const dbConn = require('../database')

/**
 * @description obtiene toda las subastas activas y futuras.
 * @param callback - es el error o resultado exitoso.
 */
exports.getAllSubastas = (callback) => {
  const sql = `
   SELECT s.identificador idSubasta,
   s.fecha         fechaSubasta,
   s.hora          horaSubasta,
   s.estado        estadoSubasta,
   s.ubicacion     ubicacionSubasta,
   s.capacidadAsistentes,
   s.categoria     categoriaSubasta,
   s2.matricula    matriculaSubastador,
   p.nombre        nombreSubastador
FROM subastas s
     JOIN subastadores s2 on s2.identificador = s.subastador
     JOIN personas p on s2.identificador = p.identificador
WHERE s.fecha >= GETDATE();`
  dbConn.service(sql, callback)
}

/**
 * @description obtiene el catalogo de una subasta en particular a partir de su idSubasta.
 * @param idSubasta - id correspondiente a la subasta. Necesario para traer el catalogo
 * @param callback - es el error o resultado exitoso.
 * @fixme PERO SUPER FIXME, ESTO ES UN DESASTRE! MEJORAR ESOS ASQUEROSOS JOINS (ADEMAS NI SE SI FUNCIONA)
 */
exports.getCatalogo = (idSubasta, callback) => {
  const sql = `
    SELECT s.identificador idSubasta,
    s.fecha         fechaSubasta,
    s.hora          horaSubasta,
    s.estado        estadoSubasta,
    s.ubicacion     ubicacionSubasta,
    s.capacidadAsistentes,
    s.categoria     categoriaSubasta,
    c.identificador idCatalogo,
    ic.producto     idProducto,
    ic.precioBase,
    ic.comision,
    ic.subastado,
    p.fecha as      'productos.fecha',
    p.disponible as      'productos.disponible',
    p.descripcionCatalogo as      'productos.descripcionCatalogo',
    p.descripcionCompleta as      'productos.descripcionCompleta',
    p2.nombre as 'productos.duenio',
    f.foto as 'productos.fotos'

FROM subastas s
      JOIN catalogos c on s.identificador = c.subasta
      JOIN itemsCatalogo ic on s.identificador = ic.identificador
      JOIN productos p on c.identificador = p.identificador
      JOIN duenios d on d.identificador = p.duenio
      JOIN personas p2 on d.identificador = p2.identificador
     JOIN fotos f on p.identificador = f.producto
 WHERE s.identificador = '${idSubasta}'`
  dbConn.service(sql, callback)
}