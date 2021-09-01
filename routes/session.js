
const { Router } = require('express');
const { validateSession } = require('../controllers/session');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/', [

	validateJWT

] ,validateSession);

module.exports= router;