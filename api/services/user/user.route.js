const router = require('express').Router()
const utils = require('../../helpers/utils')
const Controller = require("./user.controller")

router.post('/login', Controller.login);
router.post('/resetPassword', Controller.resetPassword);
router.post('/confirmCode', Controller.confirmCode);

router.post('/register', Controller.register);
router.post('/add', utils.handleAuth, Controller.add);
router.get('/edit/:id',utils.handleAuth, Controller.edit);
router.post('/update/:id',utils.handleAuth, Controller.update);
router.get('/delete/:id', utils.handleAuth, Controller.delete);
router.get('/', utils.handleAuth, Controller.getAll);

module.exports = router

