require('dotenv').config()
const dbConn = require('../database')
const bcrypt = require('bcrypt');

exports.createPersonService = (person, callback) => {
    const { email, password, documento, nombre, direccion, estado, foto } = person;

    this.validateEmail(email, (error, result) => {
        if (error) callback(error);
        else {
            if (result.recordset.length > 0) {
                callback(null, result.recordset)
            } else {

                let hashedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_ROUNDS, 10));

                const sql = `INSERT INTO personas 
                            (email, password, documento, nombre, direccion, estado, foto) 
                            VALUES
                            ('${email}','${hashedPassword}','${documento}', '${nombre}', '${direccion}', '${estado}', convert(varbinary,'${foto}'))`

                dbConn.service(sql, callback)

            }
        }
    })
}


exports.validateEmail = (_email, callback) => {
    const sql = `SELECT * FROM personas WHERE email='${_email}';`
    dbConn.service(sql, callback)
}