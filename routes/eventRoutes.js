var express = require('express');
var router = express.Router();
var eventController = require('../controllers/eventController.js');
const {middleware: {ensureAuthenticated, ensureIsAdmin}} = require('../auth');
const EventModel = require('../models/eventModel');

// Nested
router.use('/:eventId/attendance', 
    (req, res, next)=>{
        var id = req.params.eventId;

        EventModel.findOne({_id: id}, function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting event.',
                    error: err
                });
            }

            if (!event) {
                return res.status(404).json({
                    message: 'No such event'
                });
            }

            res.locals.event = event;
            return next()
        });
    },
require('./attendanceRoutes'));



/*
 * GET
 */
router.get('/', eventController.list);

/*
 * GET
 */
router.get('/:id', eventController.show);

/*
 * POST
 */
router.post('/', ensureAuthenticated, eventController.create);

/*
 * PUT
 */
router.put('/:id', ensureIsAdmin, eventController.update);

/*
 * DELETE
 */
router.delete('/:id', ensureIsAdmin, eventController.remove);

module.exports = router;
