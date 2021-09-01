const { Router } = require('express');
const { check } = require('express-validator');
const { createUsers, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/users');
const { isValidRole, isValidId } = require('../helpers/database-validations');
const validateFields = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-role');

const router = Router();

router.get('/', getAllUsers);

router.get('/:id',[
	check('id').isMongoId(),
	check('id').custom(isValidId),
	validateFields
],getUserById);

router.post('/', [
	check('firstname', 'The firstname is required').notEmpty(),
	check('lastname', 'The lastname is required').notEmpty(),
	check('email', 'The email is required').isEmail(),
	check('password', 'The password is required').isLength({min: 6}),
	check('birthday', 'The birthday is required').notEmpty(),
	check('nationality', 'The nationality is required').notEmpty(),
	check('role').custom(isValidRole), 
	check('phone', 'The phone is required').notEmpty().isNumeric(),
	check('amount', 'The amount is required').notEmpty().isNumeric(),
	validateFields
] ,createUsers);

router.put('/:id', [
	check('id').isMongoId(),
	check('id').custom(isValidId),
	validateFields
], updateUser);

router.delete('/:id',[
	validateJWT,
	isAdminRole,
	check('id').isMongoId(),
	check('id').custom(isValidId),	
	//TODO: Validate if is an admin who wanna delete an user
	validateFields
],deleteUser);

module.exports = router;