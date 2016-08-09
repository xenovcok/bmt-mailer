const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');

const app = express();

//config
app.set('view engine', 'twig')
app.set('views', './views');
app.use(express.static('public'));
app.set('twig options', { 
	strict_variables: false
});

app.use(bodyParser.urlencoded({extended: true}));

var connection_string = '127.0.0.1:27017/bmtmailerdb';

mongoose.connect(connection_string);

// app.set('trust proxy', 1); // trust first proxy
app.use('*', session({
	secret: '1234657890',
	resave: false,
	saveUninitialized: true,
	store: new session.MemoryStore(),
	cookie: {
		maxAge: 24 * 60 * 60 * 1000,
		secure: false
	}
}));



// routers
require('./router/bmt.router')(app);

app.get('*', function(req, res){
  res.redirect('/');
});

app.listen(3030, () => {
	console.log('Application Started. listening port 3030');
});
