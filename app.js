const express = require('express');
const bodyParser = require('body-parser');
const {projects} = require('./data.json');

const app = express();
app.use(bodyParser.urlencoded({ extended: false}));

// lets user use pug functionality 
app.set('view engine', 'pug');
// makes Public folder static
app.use('/static', express.static('public'));
// get the information from index.pug 
app.get("/", function(req, res, next){
  res.render('index', {projects});
})
// get the information from about.pug 
app.get("/about", function(req, res, next){
  res.render('about');
})
// get the information from project.pug accessing the parameters withing projects array
app.get("/project/:id", function(req, res, next){
const pro = parseInt(req.params.id);
const project = projects[pro];
 // redners each project by special ID number if not valid throws an error
  if(Number.isInteger(pro) && pro < projects.length && pro >= 0){
    return res.render('project',{project});
  } else{
    let err = new Error("This project page doesn't exist");
    next(err);
  }
})
// validates a 404 error
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
  console.error('Error message:', err.message, ', Error status:', err.status)
  // Error Page
  res.status(err.status);
  res.render('error');
});
// allows user to access app on local port:3000
app.listen(3000, function (){
 console.log('The App is listening to port 3000')
})
