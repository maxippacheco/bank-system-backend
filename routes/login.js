
const { Router } = require('express');
const { check } = require('express-validator');
const { loginController } = require('../controllers/login');
const validateFields = require('../middlewares/validate-fields');

const router = Router();

router.post('/', [
	check('email').isEmail(),
	check('password').notEmpty(),
	validateFields
],loginController);

module.exports= router;