var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const personaService = require('../services/personasService')


function createPersona () {
    personaService.createPersonService(req.body, (error, result) => {
        if (error) console.log(error)
        else console.log(result)
    })
}

createPersona()