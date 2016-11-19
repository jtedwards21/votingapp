var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	

	/* GET login page. */
	router.get('/', function(req, res) {

    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	router.get('/singin', function(req, res) {

    	// Display the Login page with any flash message, if any
		res.render('singin', { message: req.flash('message') });
	});

	//I need to have an address that client side can hit to get data
	router.get('/polls/latest', function(req, res) {
		var Poll = require('../models/poll');
		
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
