const express = require('express');
const path = require('path')
const app = express();

require('dotenv').config();
const {sequelize} = require('./models');

async function main(){
	await sequelize.sync({force : true});
}
main();

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'));

app.listen(process.env.PORT , () =>{
	console.log('Listening');
	console.log(process.env.NODE_ENV);
})

app.get('/' , (req , res) =>{
	res.render('index')
})
