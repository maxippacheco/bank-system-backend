
const { Router } = require('express');
const { check } = require('express-validator');
const { CreateTransaction, GetTransactions, GetTransactionById } = require('../controllers/transactions');
const { isValidId, isValidTransaction } = require('../helpers/database-validations');
const validateFields = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


//Get all transactions
router.get('/', GetTransactions);

//Get a transaction by id
router.get('/:id',[
	check('id').isMongoId(),
	check('id').custom(isValidTransaction)
], GetTransactionById);

//Create a transaction
router.post('/:id',[
	validateJWT,
	check('id').isMongoId(),
	check('id').custom(isValidId),
	validateFields
],CreateTransaction);


module.exports= router;