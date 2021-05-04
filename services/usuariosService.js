require('dotenv').config()
const dbConn = require('../database')
const bcrypt = require('bcrypt');

/**
* @description se inicia la sesión del usuario, se pasa por parametro el email correspondiente.
* @param usuario - posee todos los datos necesarios del usuario para iniciar sesión. 
* @param callback - es el error o resultado exitoso.
*/
exports.loginUsuario = (usuario, callback) => {

    this.validatePassword(usuario, (error, result) => {
        if (error) callback(error);
        else {
            if (result.recordset[0].length !== null) {
                let passwordIsValid = bcrypt.compareSync(usuario.password, result.recordset[0].password);
                if (!passwordIsValid) callback(error);
                let userData = result.recordset[0]
                this.getAllUserData(result.recordset[0].identificador, (error, result) => {
                    userData = { ...userData, ...result.recordset[0] }
                    delete userData.password
                    callback(null, userData)

                })
            }
        }
    })
}

/**
* @description se genera un usuario asociado a una persona para la primera fase de registro.
* @param persona - posee todos los datos necesarios de la persona para crear el usuario. 
* @param callback - es el error o resultado exitoso.
*/
exports.createUser = (persona, callback) => {
    const { email, identificador } = persona;
    const sql = `INSERT INTO usuarios (identificador, email, password, primerInicio) VALUES 
    ('${identificador}','${email}','${bcrypt.hashSync(email, parseInt(process.env.BCRYPT_ROUNDS, 10))}', 1)`
    dbConn.service(sql, callback)
}


/**
* @description se cambia la contraseña del usuario
* @param persona - posee email y contraseña actual. La contraseña actual varia según fase de registro
* @param callback - es el error o resultado exitoso.
*/
exports.changePassword = (persona, callback) => {
    const { email, password } = persona;
    let hashedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_ROUNDS, 10));
    const sql = `UPDATE usuarios SET password='${hashedPassword}' WHERE email='${email}'`;
    dbConn.service(sql, callback)
}


/**
* @description se cambia el email del usuario
* @param persona - posee email actual del usuario.
* @param callback - es el error o resultado exitoso.
*/
exports.changeEmail = (persona, callback) => {
    const sql = `UPDATE usuarios SET email='${persona.email}' WHERE email='${persona.email}'`;
    dbConn.service(sql, callback)
}

/**
* @description se devuelve la tabla con la información necesaria para saber si el usuario se encuentra admitido.
* @param email - email necesario para buscar al usuario.
* @param callback - es el error o resultado exitoso.
*/
exports.checkValidateUsuario = (usuario, callback) => {
    const sql = `SELECT p.identificador, u.email, u.primerInicio, c.admitido FROM usuarios u
    JOIN personas p ON p.identificador = u.identificador
    JOIN clientes c ON p.identificador = c.identificador
    WHERE u.email = '${usuario.email}';`

    dbConn.service(sql, callback)
}

/**
* @description se determina si el usuario existe dentro de la base de datos a partir de su email y documento.
* @param usuario - email y documento necesario para buscar al usuario.
* @param callback - es el error o resultado exitoso.
*/
exports.checkUsuarioExistente = (usuario, callback) => {
    const sql = `SELECT u.email, p.documento from usuarios u JOIN personas p on p.identificador = u.identificador where u.email = '${usuario.email}' OR p.documento = '${usuario.documento}';`
    dbConn.service(sql, callback)
}

/**
* @description se devuelve la contraseña de un usuario correspondiente.
* @param email - email necesario para buscar al usuario.
* @param callback - es el error o resultado exitoso.
*/
exports.validatePassword = (usuario, callback) => {
    const sql = `SELECT u.identificador, u.email, u.password FROM usuarios u WHERE u.email = '${usuario.email}';`
    dbConn.service(sql, callback)
}

/**
* @description se devuelve toda la información asociada a un usuario correspondiente.
* @param identificador - identificador del usuario en la base de datos.
* @param callback - es el error o resultado exitoso.
*/
exports.getAllUserData = (identificador, callback) => {
    const sql = `SELECT pe.identificador, pe.documento, pe.nombre nombreCompleto, pe.direccion, pe.estado, pe.foto, c.admitido, c.categoria, pa.nombre nombrePais, pa.nombreCorto, pa.nacionalidad, pa.capital FROM personas pe
    JOIN clientes c on pe.identificador = c.identificador
    JOIN paises pa on pa.numero = c.numeroPais
    WHERE pe.identificador = ${identificador}`
    dbConn.service(sql, callback)
}