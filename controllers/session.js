
const { response, request } = require('express');
const { generateJWT } = require('../helpers/generate-jwt');

const validateSession = async(req = request, res = response) => {
	
	const user = req.user
	const token = await generateJWT(user.id);

	res.json({
		token,
		user
	})

}

module.exports = {
	validateSession
};