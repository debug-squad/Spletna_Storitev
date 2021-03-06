var express = require('express');
var router = express.Router();
var weatherController = require('../controllers/weatherController.js');
const {middleware: {ensureAuthenticated, ensureIsAdmin}} = require('../auth');
const EventModel = require('../models/eventModel');

/*
 * GET
 */
router.get('/', weatherController.list);

/*
 * GET
 */
router.get('/:id', weatherController.show);

/*
 * POST
 */
router.post('/', weatherController.create);

/*
 * PUT
 */
router.put('/:id', weatherController.update);

/*
 * DELETE
 */
router.delete('/:id', weatherController.remove);

module.exports = router;
