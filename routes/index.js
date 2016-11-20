var express = require('express');
var router = express.Router();
var Poll = require('../models/poll');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/signin');
}

var redirectHome = function (req, res, next) {
	if (req.isAuthenticated()){res.redirect('/home')}
	else{return next()}
}

module.exports = function(passport){

	

	/* GET login page. */
	router.get('/', redirectHome,  function(req, res) {

    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	router.get('/signin', function(req, res) {

    	// Display the Login page with any flash message, if any
		res.render('signin', { message: req.flash('message') });
	});

	router.get('/polls/create', function(req, res){
		res.render('create', {message: req.flash('message')})
})

	router.get('/polls/user/:user', function(req, res){
		//I need to get the four most recent polls of a specific user
		Poll.find({})
		.where('creator').equals(req.params.user)
		.exec(function(err, d){res.send(JSON.stringify(d))});
	});

	//I need to have an address that client side can hit to get data
	router.get('/polls/latest', function(req, res) {
		
		var cursor = Poll.find({ }, function(err, d){
			console.log(d[0])
			res.send(JSON.stringify(d[0]));
		})
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Poll Creation */
	
	router.post('/polls/new', function(req, res){
		var title = req.body.title
		var creator = req.body.creator
		var question = req.body.question
		var choices = []
		
		//Insert into database
		var p = new Poll;
		p.title = title;
		p.creator = creator
		p.question = question
		p.totalvotes = 0
		p.choices = choices
		//The problems is with the choices model
		//I can try to make a new model first and then push it in
		var keys = Object.keys(req.body).slice(3)
		console.log(keys)
		for(k in keys){
			p.choices.push(Object.getOwnPropertyDescriptor(req.body, keys[k]).value)
			console.log(p.choices)
		}
		
		p.save(function(err){
		if(err){
		console.log(err)
		}
		res.redirect('/home');
		})

		
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}
