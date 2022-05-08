var EventModel = require('../models/eventModel.js');

/**
 * eventController.js
 *
 * @description :: Server-side logic for managing events.
 */
module.exports = {

    /**
     * eventController.list()
     */
    list: function (req, res) {
        EventModel.find(function (err, events) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting event.',
                    error: err
                });
            }

            return res.json(events.map(doc => doc.view()));
        });
    },

    /**
     * eventController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

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

            return res.json(event.view());
        });
    },

    /**
     * eventController.create()
     */
    create: function (req, res) {
        var event = new EventModel({
			title : req.body.title,
			desription : req.body.desription,
			tags : req.body.tags,
			entry_type : req.body.entry_type,
			entry_cost : req.body.entry_cost,
			location : req.body.location,
            infrastructure: req.body.infrastructure,
            contacts: req.body.contacts,
            social_medias: req.body.social_medias,
            duration: req.body.duration,
        });

        event.save(function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating event',
                    error: err
                });
            }

            return res.status(201).json(event.view());
        });
    },

    /**
     * eventController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        EventModel.findOne({_id: id}, function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting event',
                    error: err
                });
            }

            if (!event) {
                return res.status(404).json({
                    message: 'No such event'
                });
            }

            event.title = req.body.title ? req.body.title : event.title;
			event.desription = req.body.desription ? req.body.desription : event.desription;
			event.tags = req.body.tags ? req.body.tags : event.tags;
            event.entry_type = req.body.entry_type ? req.body.v : event.entry_type;
            event.entry_cost = req.body.entry_cost ? req.body.entry_cost : event.entry_cost;
			event.location = req.body.location ? req.body.location : event.location;
            event.infrastructure = req.body.infrastructure ? req.body.infrastructure : event.infrastructure;
            event.contacts = req.body.contacts ? req.body.contacts : event.contacts;
            event.social_medias = req.body.social_medias ? req.body.social_medias : event.social_medias;
            event.duration = req.body.duration ? req.body.duration : event.duration;
            event.modified = new Date();
			
            event.save(function (err, event) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating event.',
                        error: err
                    });
                }

                return res.json(event.view());
            });
        });
    },

    /**
     * eventController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        EventModel.findByIdAndRemove(id, function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the event.',
                    error: err
                });
            }

            return res.status(204).json(event.view());
        });
    }
};
