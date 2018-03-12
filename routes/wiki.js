'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect( '../' );
});

router.post('/', function(req, res, next) {
  res.send('response to POST request to /wiki/');
});

router.get('/add', function(req, res, next) {
  res.render( 'addpage' );
});

module.exports = router;
