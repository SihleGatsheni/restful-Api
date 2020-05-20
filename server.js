const express = require('express');
const mysql = require('mysql');
//const bodyParser = require('body-parser');


const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password:'Root1234@',
	database: 'api_db'
});

const app = express();
//app.use(bodyParser.urlencoded({extends: true}));
//app.use(bodyParser.json);

app.get('/', (req, res) => {
	res.json({name: 'sihle}'});
});


app.get('/apis', (req, res) => {
	con.query('SELECT * FROM menu',(err, rowdata) => {
		if(err) throw err;
		res.json(rowdata);

	})
});

app.get('/apis/:id',(req, res) => {

	let item_id = req.params.id;
	con.query('SELECT * FROM menu',[item_id],(err, rowdata) => {
		if(err) throw err;
		res.json(rowdata[item_id]);

	})
});

app.post('/apis', (req, res) =>{
	let title = req.body.title;
	let  des = req.body.des;
	let price = req.body.price;
	let date =req.body.date;
	con.query('INSERT INTO menu VALUES(?,?,?,?)',[title,des,price,date], (err, rowdata)=>{
		if(err) throw err;
		res.json({status: 'sucess', id:rowdata.insertId});
		console.log('added successfully')
	})
})



const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>{
	console.log(`Server Listning for calls on PORT ${PORT}`);
});



