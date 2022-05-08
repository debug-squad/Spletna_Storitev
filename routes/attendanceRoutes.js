var express = require('express');
var router = express.Router();
var attendanceController = require('../controllers/attendanceController.js');
const {middleware: {ensureAuthenticated, ensureIsAdmin}} = require('../auth');

/*
 * GET
 */
router.get('/', attendanceController.list);

/*
 * GET
 */
router.get('/:id', attendanceController.show);

/*
 * POST
 */
router.post('/', ensureAuthenticated, attendanceController.create);

/*
 * DELETE
 */
router.delete('/:id', ensureIsAdmin, attendanceController.remove);

module.exports = router;
