require('dotenv').config()
const dbConn = require('../database')
const bcrypt = require('bcrypt');

/**
* @description se inicia la sesión del usuario.
* @param persona - posee todos los datos necesarios de la persona para la primer fase del registro. 
* @param callback - es el error o resultado exitoso.
*/
exports.loginPersonaService = (persona, callback) => {

    this.validatePersonaService(persona, (error, result) => {
        if (error) callback(error);
        else {
            if (result.recordset.length > 0) {
                let passwordIsValid = bcrypt.compareSync(persona.password, result.recordset[0].password);
                if (!passwordIsValid) callback(error);
                callback(null, result.recordset)
            }
        }
    })
}

/**
* @description se registra al usuario (primer fase). Esto genera un usuario nuevo en donde la contraseña es el documento de identidad de la persona. Dicha contraseña debe ser cambiada al ser verificado el usuario.
* @param persona - posee todos los datos necesarios de la persona para la primer fase del registro. 
* @param callback - es el error o resultado exitoso.
*/
exports.registerPersonaService = (persona, callback) => {
    const { email, documento, nombre, direccion, estado, foto } = persona;

    this.validatePersonaService(persona, (error, result) => {
        if (error) callback(error);
        else {
            if (result.recordset.length > 0) callback(null, result.recordset)
            else {

                const sql = `INSERT INTO personas 
                            (email, password, documento, nombre, direccion, estado, foto) 
                            VALUES
                            ('${email}','${documento}','${documento}', '${nombre}', '${direccion}', 'activo', convert(varbinary,'${foto}'))`

                dbConn.service(sql, callback)

            }
        }
    })
}

/**
* @description se cambia la contraseña del usuario
* @param persona - posee email y contraseña actual. La contraseña actual varia según fase de registro
* @param callback - es el error o resultado exitoso.
*/
exports.changePassword = (persona, callback) => {
    const { email, password } = persona;
    let hashedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_ROUNDS, 10));
    // error happens
    if (!hashedPassword) callback(error);
    else {
        const sql = `UPDATE personas SET password='${hashedPassword}' WHERE email='${email}'`;
        dbConn.service(sql, callback)
    }
}


/**
* @description se cambia el email del usuario
* @param persona - posee email actual del usuario.
* @param callback - es el error o resultado exitoso.
*/
exports.changeEmail = (persona, callback) => {
    const sql = `UPDATE personas SET email='${persona.email}' WHERE email='${persona.email}'`;
    dbConn.service(sql, callback)
}

/**
* @description se busca si existe algún registro de la persona buscada.
* @param persona - posee email y documento del usuario.
* @param callback - es el error o resultado exitoso.
*/
exports.validatePersonaService = (persona, callback) => {
    const sql = `SELECT * FROM personas WHERE email='${persona.email}' OR documento='${persona.documento}';`
    dbConn.service(sql, callback)
}