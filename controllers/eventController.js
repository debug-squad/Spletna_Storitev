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
        let query = {};
        {
            let lat = req.query.lat;
            let long = req.query.long;
            let dist = req.query.dist;
            if(lat != undefined && long != undefined && dist != undefined) {
                query = {
                    ...query,
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point" ,
                                coordinates: [ +lat, +long ]
                            },
                            $maxDistance: +dist,
                        }
                    }
                };
            } else if (lat != undefined || long != undefined || dist != undefined) {
                return res.status(401).json({
                    error: true,
                    message: 'when doing geospacial queries lat, long and dist must be defined'
                })
            }
        }

        {
            let after =  req.query.after;
            if(after != undefined) {
                after = new Date(after);

                query = {
                    ...query,
                    $or: [
                        { "date_start": { $gte: after } },
                        { "date_end": { $gte: after } },
                    ],
                };
            }

        }
        EventModel.find(query).exec(function (err, events) {
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
			description : req.body.description,
			date_start : req.body.date_start,
			date_end : req.body.date_end,
			location : req.body.location,
			organization : req.body.organization,
			contact : req.body.contact,
			price : req.body.price,
			tags : req.body.tags,
			image_url : req.body.image_url,
			site_url : req.body.site_url
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
			event.description = req.body.description ? req.body.description : event.description;
			event.date_start = req.body.date_start ? req.body.date_start : event.date_start;
			event.date_end = req.body.date_end ? req.body.date_end : event.date_end;
			event.location = req.body.location ? req.body.location : event.location;
			event.organization = req.body.organization ? req.body.organization : event.organization;
			event.contact = req.body.contact ? req.body.contact : event.contact;
			event.price = req.body.price ? req.body.price : event.price;
			event.tags = req.body.tags ? req.body.tags : event.tags;
			event.image_url = req.body.image_url ? req.body.image_url : event.image_url;
			event.site_url = req.body.site_url ? req.body.site_url : event.site_url;
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
