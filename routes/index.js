'use strict';

const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const wikiRouter = require('./wiki');

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);
router.get('/', (req, res) => res.render('index'));

module.exports = router;
