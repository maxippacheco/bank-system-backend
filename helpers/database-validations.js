const { Role, User, Transaction } = require('../models/')


const isValidRole = async( role = '' ) => {
	
	const is_valid = await Role.findOne({role});

	if (!is_valid) {
		throw new Error(`The role ${ is_valid } does not exist`);
	}
}

const isValidId = async( id = '' ) => {
	const is_valid = await User.findById(id);

	if (!is_valid) {
		throw new Error(`The id ${ id } does not exist`)
	}
}

const isValidTransaction = async( id = '' ) => {
	
	const is_valid = await Transaction.findById( id );

	if ( !is_valid ) {
		throw new Error(`The transaction ${ id } does not exist`);
	}
}

module.exports = {
	isValidRole,
	isValidId,
	isValidTransaction
}
