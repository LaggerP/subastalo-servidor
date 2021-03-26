const router = require('express').Router();

router.get('/api', function (req, res) {
    res.json({ msg: "funcionando" })
})

module.exports = router;