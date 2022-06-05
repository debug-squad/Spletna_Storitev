var ClientModel = require('../models/clientModel.js');
const { hash, genSalt } = require('bcrypt'); 

const SALT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || 10);

/**
 * clientController.js
 *
 * @description :: Server-side logic for managing clients.
 */
module.exports = {
    login: require('../auth').controllers.login,

    register: async (req, res, next) => {
        const { client_name, email, password } = req.body;
        let client = new ClientModel({
            client_name,
            email,
            password_hash: await hash(password, await genSalt(SALT_ROUNDS))
        })

        try {
            await client.save();
        } catch(e) {
            return next(e)
        }

        res.json(client.view());
    },

    profile: (req, res) => {
        res.json(req.user.view());
    },

    /**
     * clientController.list()
     */
    list: function (req, res) {
        ClientModel.find(function (err, clients) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting client.',
                    error: err
                });
            }

            return res.json(clients.map(doc=>doc.view()));
        });
    },

    /**
     * clientController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        ClientModel.findOne({_id: id}, function (err, client) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting client.',
                    error: err
                });
            }

            if (!client) {
                return res.status(404).json({
                    message: 'No such client'
                });
            }

            return res.json(client.view());
        });
    },

    /**
     * clientController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ClientModel.findOne({_id: id}, function (err, client) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting client',
                    error: err
                });
            }

            if (!client) {
                return res.status(404).json({
                    message: 'No such client'
                });
            }

            client.client_name = req.body.client_name ? req.body.client_name : client.client_name;
			client.email = req.body.email ? req.body.email : client.email;
            client.modified = new Date();
			
            client.save(function (err, client) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating client.',
                        error: err
                    });
                }

                return res.json(client.view());
            });
        });
    },

    /**
     * clientController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ClientModel.findByIdAndRemove(id, function (err, client) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the client.',
                    error: err
                });
            }

            return res.status(204).json(client?.view() || {});
        });
    }
};
