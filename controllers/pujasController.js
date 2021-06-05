const pujasService = require('../services/pujasService');

/**
 * @description trae todas las pujas realizadas.
 * @param req - posee el id asociado al catalogo.
 * @param res - retorna todas las pujas.
 */
exports.getPujasByCatalogoId = async (req, res) => {
  try {
    const pujas = await pujasService.getPujasByItemCatalogoId(req.params.id);
    return res.status(200).send(pujas)
  } catch (e) {
    return res.status(500).send("Error en el servidor");
  }
}


/**
 * @description permite registrar una nueva puja sobre un producto en subasta (previa registración del asistente).
 * @param req - idSubasta, idCliente, numeroPostor, importe, idItem.
 * @param res - retorna mensaje de puja realizada con éxito y el idAsistente.
 */
exports.newPuja = async (req, res) => {
  let horario = new Date().toLocaleString({timeZone: 'America/Argentina/Buenos_Aires'}).slice(0, 19).replace('T', ' ');
  let {idSubasta, idCliente, numeroPostor, importe, idItem} = req.body;
  try {
    const asistenteYaRegistrado = await pujasService.getAsistenteBySubastaAndCliente({idSubasta, idCliente});
    // asistente ya esta registrado en la subasta
    if (asistenteYaRegistrado.length > 0) {
      let asistente = asistenteYaRegistrado[0].idAsistente;
      const puja = await pujasService.registerPuja({asistente, idItem, importe});
      const idPuja = puja[0].idPuja;
      await pujasService.registerHorarioPuja({idPuja, horario});
      return res.status(201).json({
        msg: "Puja realizada con éxito",
        idAsistente: asistente
      })
    }
    // asistente no se encuentra registrado en la subasta. Se procede a registrarlo
    else if (asistenteYaRegistrado.length === 0) {
      const asistenteRegistrado = await pujasService.registerAsistente({idSubasta, idCliente, numeroPostor});
      if (asistenteRegistrado.length > 0) {
        let asistente = asistenteRegistrado[0].idAsistente;
        const puja = await pujasService.registerPuja({asistente, idItem, importe});
        const idPuja = puja[0].idPuja;
        await pujasService.registerHorarioPuja({idPuja, horario})
        return res.status(201).json({
          msg: "Puja realizada con éxito",
          idAsistente: asistente
        })
      }
    }
  } catch (e) {
    return res.status(500).json({msg: "Error de servidor"})
  }
}