const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const router = require('./routes');
const fs = require('fs');
const bodyParser = require('body-parser');
const models = require('./models');

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// static middleware
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

// body parsing middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// router
app.use('/', router);

// sync models
models.db
  .sync()
  .then(function() {
    console.log('All tables created!');
    app.listen(1337, function() {
      console.log('listening on port 1337');
    });
  })
  .catch(console.error.bind(console));

// start the server
// var server = app.listen(1337, function(){
//   console.log('listening on port 1337');
// });
