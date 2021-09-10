const { response, request } = require('express');
const Transaction = require('../models/transaction');
const User = require('../models/user');

const GetTransactions = async(req, res = response) => {

	// const query = { status: true };

	const [ transactions, total ] = await Promise.all([
		Transaction.find(),
		Transaction.countDocuments()
	]);
	
	res.json({
		total,
		transactions
	});
}

const GetTransactionById = async(req, res = response) => {

	const { id } = req.params;
	const transaction = await Transaction.findById( id );

	res.json({transaction: transaction});
}


// const CreateTransaction = async(req, res = response) => {
	
// 	const { id } = req.params;
// 	let { amount } = req.body;

// 	//Person who do the transaction
// 	let userTransactionTo = req.user;
// 	let userGivesMoney = await User.findById(id);
	
// 	if (userTransactionTo.amount < 0) {
// 		return res.status(401).json({
// 			msg: `You don't have money to do this transaction`
// 		})
// 	};

// 	//Rest the money of the user to the amount you want to transfer
// 	const amountLessTransaction = userTransactionTo.amount = userTransactionTo.amount - amount;
// 	const amountPlusTransaction = userGivesMoney.amount = userGivesMoney.amount + amount;

// 	//Update DB
// 	await User.findByIdAndUpdate(id, { ...userGivesMoney ,amountPlusTransaction}, {new: true});
// 	await User.findByIdAndUpdate(userTransactionTo.id, { ...userTransactionTo ,amountLessTransaction}, {new: true});
	
// 	const userId = userGivesMoney.id
// 	const user = userTransactionTo;
	
// 	// Create transaction
// 	const transaction = new Transaction({
// 		user,
// 		amount,
// 		userId,
// 		msg: 'Any trouble that you have with the transaction, please contact with the bank.'
// 	});

// 	await transaction.save();
	
// 	//Return the transaction
// 	res.json({
// 		transaction,
// 		amountTo: amountPlusTransaction,
// 		amountLess: amountLessTransaction
// 	});

// }

const CreateTransaction = async(req, res = response) => {
	
	// const { id } = req.params;
	let { amount, userTo, userFrom } = req.body;

	//Person who do the transaction
	let userTransactionTo = await User.findById(userTo);
	let userGivesMoney = await User.findById(userFrom);
	
	if (userTransactionTo.amount < 0) {
		return res.status(401).json({
			msg: `You don't have money to do this transaction`
		});
	};

	
	if (!userTransactionTo._id) {
		return res.status(401).json({
			msg: 'This ID doesnt exists'
		});
	};


	//Rest the money of the user to the amount you want to transfer
	const amountLessTransaction = userTransactionTo.amount = userTransactionTo.amount - amount;
	const amountPlusTransaction = userGivesMoney.amount = userGivesMoney.amount + amount;

	//Update DB
	await User.findByIdAndUpdate(userGivesMoney.id, { ...userGivesMoney ,amountPlusTransaction}, {new: true});
	await User.findByIdAndUpdate(userTransactionTo.id, { ...userTransactionTo ,amountLessTransaction}, {new: true});
	
	const userId = userGivesMoney.id
	const user = userTransactionTo;
	
	// Create transaction
	const transaction = new Transaction({
		user,
		amount,
		userId,
		msg: 'Any trouble that you have with the transaction, please contact with the bank.'
	});

	await transaction.save();
	
	//Return the transaction
	res.json({
		transaction,
		amountTo: amountPlusTransaction,
		amountLess: amountLessTransaction
	});

}



module.exports = {
	GetTransactions,
	GetTransactionById,
	CreateTransaction,
};