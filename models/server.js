const express = require('express');
const cors = require('cors');
const dbConfigConnection = require('../database/config');

class Server{

	constructor(){
		this.app = express();
		this.port = process.env.PORT;
		
		this.apiPaths = {
			users: '/api/users',
			login: '/api/login',
			transactions: '/api/transactions',
			session: '/api/session'

		}	

		this.middlewares();
		this.routes();
		this.dbConnection();

	}
	
	async dbConnection(){
		await dbConfigConnection();
	}
	
	middlewares(){
		this.app.use(express.json());
		this.app.use(cors());
	}
	
	routes(){
		this.app.use(this.apiPaths.users, require('../routes/users'));
		this.app.use(this.apiPaths.login, require('../routes/login'));
		this.app.use(this.apiPaths.transactions, require('../routes/transactions'));
		this.app.use(this.apiPaths.session, require('../routes/session'));
	}
	
	listen(){	
		this.app.listen(this.port, () => {
			console.log(`Server working on port ${this.port}`);
		})
	}
	
}

module.exports = Server;