const { request, response } = require("express");


const isAdminRole = (req = request, res = response, next) => {
	
	if (!req.user) {
		return res.status(500).json({
			error: 'First start the session to validate if you are an admin'
		});
	}

	const { role, firstname, lastname } = req.user;

	if (role !== 'ADMIN_ROLE') {
		return res.status(403).json({
			msg: `The user ${firstname} ${lastname} is not an administrator.`
		})
	}

	next();

}


module.exports = {
	isAdminRole
}
