'use strict'
const dbConn = require('../database');


module.exports.up = function (next) {
    const sqlQuery = `
    INSERT INTO productoSeguimiento (producto, estado)
    VALUES 
        (1, 'aceptado'),
        (2, 'aceptado'),
        (3, 'aceptado'),
        (4, 'aceptado'),
        (5, 'aceptado'),
        (6, 'aceptado');
`;
    dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
    next()
}
