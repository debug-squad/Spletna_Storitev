var Config_eventModel = require('../models/CONFIG_eventModel.js');

/**
 * CONFIG_eventController.js
 *
 * @description :: Server-side logic for managing CONFIG_events.
 */
module.exports = {

    /**
     * CONFIG_eventController.list()
     */
    list: function (req, res) {
        Config_eventModel.find(function (err, CONFIG_events) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting CONFIG_event.',
                    error: err
                });
            }

            return res.json(CONFIG_events);
        });
    },

    /**
     * CONFIG_eventController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Config_eventModel.findOne({_id: id}, function (err, CONFIG_event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting CONFIG_event.',
                    error: err
                });
            }

            if (!CONFIG_event) {
                return res.status(404).json({
                    message: 'No such CONFIG_event'
                });
            }

            return res.json(CONFIG_event);
        });
    },

    /**
     * CONFIG_eventController.create()
     */
    create: function (req, res) {
        var CONFIG_event = new Config_eventModel({
			interval : req.body.interval,
			CSS_selector : req.body.CSS_selector,
			created : Date.now(),
			modified : Date.now()
        });

        CONFIG_event.save(function (err, CONFIG_event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating CONFIG_event',
                    error: err
                });
            }

            return res.status(201).json(CONFIG_event);
        });
    },

    /**
     * CONFIG_eventController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Config_eventModel.findOne({_id: id}, function (err, CONFIG_event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting CONFIG_event',
                    error: err
                });
            }

            if (!CONFIG_event) {
                return res.status(404).json({
                    message: 'No such CONFIG_event'
                });
            }

            CONFIG_event.interval = req.body.interval ? req.body.interval : CONFIG_event.interval;
			CONFIG_event.CSS_selector = req.body.CSS_selector ? req.body.CSS_selector : CONFIG_event.CSS_selector;
			CONFIG_event.modified = new Date();

			
            CONFIG_event.save(function (err, CONFIG_event) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating CONFIG_event.',
                        error: err
                    });
                }

                return res.json(CONFIG_event);
            });
        });
    },

    /**
     * CONFIG_eventController.remove()
     */

    dodaj: function(req, res){
        res.render('config');
    },

    remove: function (req, res) {
        var id = req.params.id;

        Config_eventModel.findByIdAndRemove(id, function (err, CONFIG_event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the CONFIG_event.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
