'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res, next) {
  //want to retrieve all pages
  res.redirect('../');
});

router.post('/', function(req, res, next) {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  const page = Page.build({
    title: req.body.title,
    // urlTitle: req.body.title.split(' ').join('%20'),
    content: req.body.content
  });

  console.log(page);

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page
    .save()
    .then(result => res.redirect('/'))
    .catch(err => console.log(err));

});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

module.exports = router;
