const express = require('express');
const app = express();

require('dotenv').config();
const {sequelize} = require('./models');

async function main(){
	await sequelize.sync({force : true});
}
main();

app.listen(process.env.PORT , () =>{
	console.log('Listening');
}
)
