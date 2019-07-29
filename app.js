const express = require('express');
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');
const {projects} = require('./data.json');

const app = express();
app.use(bodyParser.urlencoded({ extended: false}));

// Set pug
app.set('view engine', 'pug');
// Set static route
app.use('/static', express.static('public'));

// Index route
app.get("/", function(req, res, next){
  res.render('index', {projects});
})

// About route
app.get("/about", function(req, res, next){
  res.render('about');
})

// Project route with ID param
app.get("/project/:id", function(req, res, next){
  const pro = parseInt(req.params.id);
  const project = projects[pro];

  // check if project page has valid ID else throw specific project page error
  if(Number.isInteger(pro) && pro < projects.length && pro >= 0){
    return res.render('project',{project});
  } else{
    let err = new Error("This project page doesn't exist");
    next(err);
  }
})

// Unspecific 404 error
app.use(function(req, res, next){
  const err = new Error('Not found')
  next(err);
})

// Print error page
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.locals.error = err;
  err.status = 404;

  // Console Log
  console.error('Error message:', err.message, ', Error status:', err.status)

  // Error Page
  res.status(err.status);
  res.render('error');
});

// App listen
app.listen(3000, function (){
 console.log('The App is listening to port 3000')
})
