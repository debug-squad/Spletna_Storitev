var AttendanceModel = require('../models/attendanceModel.js');
var EventModel = require('../models/eventModel');

/**
 * attendanceController.js
 *
 * @description :: Server-side logic for managing attendances.
 */
module.exports = {

    /**
     * attendanceController.list()
     */
    list: function (req, res) {
        let query = {};
        if(res.locals.event) query.event = res.locals.event.id;
        AttendanceModel.find(query).exec(function (err, attendances) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting attendance.',
                    error: err
                });
            }

            return res.json(attendances);
        });
    },

    /**
     * attendanceController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        let query = { _id: id };
        if(res.locals.event) query.event = res.locals.event.id;

        AttendanceModel.findOne(query, function (err, attendance) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting attendance.',
                    error: err
                });
            }

            if (!attendance) {
                return res.status(404).json({
                    message: 'No such attendance'
                });
            }

            return res.json(attendance);
        });
    },

    /**
     * attendanceController.create()
     */
    create: function (req, res) {
        var attendance = new AttendanceModel({
			event : res.locals.event?.id ? res.locals.event.id : req.body.event,
			// timestamp : req.body.timestamp
        });

        attendance.save(function (err, attendance) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating attendance',
                    error: err
                });
            }

            EventModel.findById(attendance.event, function(err, event) {
                if (err) {
                    return res.status(500).json({
                        message: 'Event id invalid',
                        error: err
                    });
                }

                event.attendace += 1;
                event.modified = new Date();

                event.save(function (err, event) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error while updating event',
                            error: err
                        });
                    }

                    return res.status(201).json(attendance);
                })
            })
        });
    },

    /**
     * attendanceController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        let query = { _id: id };
        if(res.locals.event) query.event = res.locals.event.id;

        AttendanceModel.findOneAndRemove(query, function (err, attendance) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the attendance.',
                    error: err
                });
            }

            EventModel.findById(attendance.event, function(err, event) {
                if (err) {
                    return res.status(500).json({
                        message: 'Event id invalid',
                        error: err
                    });
                }

                event.attendace -= 1;
                event.modified = new Date();

                event.save(function (err, event) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error while updating event',
                            error: err
                        });
                    }

                    return res.status(204).json(attendance?.view() || {});
                })
            })
        });
    }
};
