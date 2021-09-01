const { response, request } = require('express');
const bcryptjs = require('bcrypt')
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const loginController = async(req = request, res = response) => {
	//collect the data
	const { email, password } = req.body;

	try {
		const userDb = await User.findOne({email});
		
		//validate if the user exists
		if (!userDb.email) {
			return res.status(400).json({
				error: 'Please revise the information you have sent: Email / Password'
			})
		}

		if (!userDb.status) {
			return res.status(400).json({
				error: 'The user doesn not exist, please create a new one if you want to login'
			})
		}

		const validPassword = bcryptjs.compareSync(password, userDb.password);
		if (!validPassword) {
			return res.status(400).json({
				error: 'Please revise the information you have sent: Email / Password'
			})
		}

		//create JWT
		const token = await generateJWT(userDb.id);

		//Send the token and the user
		res.json({
			msg: 'Login completely done',
			token,
			user:{
				user: `${userDb.firstname} ${userDb.lastname}`,
				email: userDb.email,
				balance: userDb.amount,
				id: userDb.id,
				role: userDb.role,
				...userDb._doc
			}
		})
		
	} catch (error) {
		console.log(error);
	}


}

module.exports = {
		loginController
};