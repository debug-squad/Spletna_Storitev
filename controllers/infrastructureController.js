var InfrastructureModel = require('../models/infrastructureModel.js');

/**
 * infrastructureController.js
 *
 * @description :: Server-side logic for managing infrastructures.
 */
module.exports = {

    /**
     * infrastructureController.list()
     */
    list: function (req, res) {
        InfrastructureModel.find(function (err, infrastructures) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting infrastructure.',
                    error: err
                });
            }

            return res.json(infrastructures.map(doc=>doc.view()));
        });
    },

    /**
     * infrastructureController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        InfrastructureModel.findOne({_id: id}, function (err, infrastructure) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting infrastructure.',
                    error: err
                });
            }

            if (!infrastructure) {
                return res.status(404).json({
                    message: 'No such infrastructure'
                });
            }

            return res.json(infrastructure.view());
        });
    },

    /**
     * infrastructureController.create()
     */
    create: function (req, res) {
        var infrastructure = new InfrastructureModel({
			title : req.body.title,
            type : req.body.type,
			tags : req.body.tags,

			address : req.body.address,
			location : req.body.location,
        });

        infrastructure.save(function (err, infrastructure) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating infrastructure',
                    error: err
                });
            }

            return res.status(201).json(infrastructure.view());
        });
    },

    /**
     * infrastructureController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        InfrastructureModel.findOne({_id: id}, function (err, infrastructure) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting infrastructure',
                    error: err
                });
            }

            if (!infrastructure) {
                return res.status(404).json({
                    message: 'No such infrastructure'
                });
            }

            infrastructure.title = req.body.title ? req.body.title : infrastructure.title;
            infrastructure.type = req.body.type ? req.body.type : infrastructure.type;
            infrastructure.tags = req.body.tags ? req.body.tags : infrastructure.tags;

			infrastructure.address = req.body.address ? req.body.address : infrastructure.address;
			infrastructure.location = req.body.location ? req.body.location : infrastructure.location;
            event.modified = new Date();

            infrastructure.save(function (err, infrastructure) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating infrastructure.',
                        error: err
                    });
                }

                return res.json(infrastructure.view());
            });
        });
    },

    /**
     * infrastructureController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        InfrastructureModel.findByIdAndRemove(id, function (err, infrastructure) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the infrastructure.',
                    error: err
                });
            }

            return res.status(204).json(infrastructure.view());
        });
    }
};
