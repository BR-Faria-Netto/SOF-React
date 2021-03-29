const router = require('express').Router()
const utils = require('../../helpers/utils')
const controller = require("./nad.controller")

router.post('/add', utils.handleAuth, controller.add);
router.get('/edit/:id', utils.handleAuth, controller.edit);
router.post('/update/:id',utils.handleAuth, controller.update);
router.get('/delete/:id', utils.handleAuth, controller.delete);
router.get('/:page', controller.getAll);


module.exports = router