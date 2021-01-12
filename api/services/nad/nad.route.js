const router = require('express').Router()
const utils = require('../../helpers/utils')
const Controller = require("./nad.controller")

router.post('/add', utils.handleAuth, Controller.add);
router.get('/edit/:id', utils.handleAuth, Controller.edit);
router.post('/update/:id',utils.handleAuth, Controller.update);
router.get('/delete/:id', utils.handleAuth, Controller.delete);
router.get('/', Controller.getAll);

module.exports = router