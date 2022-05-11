const express = require('express');
const app = express();

require('dotenv').config();

const {sequelize} = require('./models');
async function main(){
	await sequelize.sync({force : true});
}
main();

const path = require('path')
app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'));

app.listen(process.env.PORT , () =>{
	console.log('Listening');
})
const morgan = require('morgan');
app.use(morgan('tiny'));

app.get('/' , (req , res) =>{
	res.render('index')
})
app.get('/cat' , async (req, res, next) =>{
	next(new Error("This is a error"));
})

// app.use((err, req, res , next) =>{
// 	console.log(err?.message);
// 	res.status(401).send('<h1>Hello Error</h1>');	
// })