const { Schema, model } = require("mongoose");

const TransactionSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	amount: {
		type: Number,
		default: 100,
		required: [true, 'You need to send money if you want to make a transaction']
	},
	userId: {
		type: String,
		// ref: 'User',
		required: [true, 'Please put the account id of the person you want to send money']
	}
});



module.exports = model('Transaction', TransactionSchema);
