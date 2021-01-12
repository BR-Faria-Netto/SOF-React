const router = require('express').Router()
const utils = require('../../helpers/utils')
const Controller = require("./responsavel.controller")

router.post('/add', utils.handleAuth, Controller.add);
router.post('/update/:id',utils.handleAuth, Controller.update);
router.get('/edit/:id', utils.handleAuth, Controller.edit);
router.get('/delete/:id', utils.handleAuth, Controller.delete);
router.get('/', Controller.getAll);
router.get('/emissor', Controller.getEmissor);
router.get('/ordenador', Controller.getOrdenador);
router.get('/ratificador', Controller.getRatificador);

module.exports = router