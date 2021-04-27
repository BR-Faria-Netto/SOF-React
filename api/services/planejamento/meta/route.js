const router = require('express').Router()
const utils = require('../../../helpers/utils')
const controller = require('./controller')

router.post('/add', utils.handleAuth, controller.add);
router.post('/update/:id',utils.handleAuth, controller.update);
router.get('/edit/:id', utils.handleAuth, controller.edit);
router.get('/delete/:id', utils.handleAuth, controller.delete);
router.get('/', controller.getAll);

module.exports = router