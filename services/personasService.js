require('dotenv').config()
const dbConn = require('../database')
const bcrypt = require('bcrypt');

module.exports.createPersonService = (person, callback) => {
    const { email, password, documento, nombre, direccion, estado, foto } = person;

    let hashedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_ROUNDS, 10));

    const sql = `INSERT INTO personas 
    (email, password, documento, nombre, direccion, estado, foto) 
    VALUES
    ('${email}','${hashedPassword}','${documento}', '${nombre}', '${direccion}', '${estado}', convert(varbinary,'${foto}'))`

    dbConn.service(sql, callback)
    
}