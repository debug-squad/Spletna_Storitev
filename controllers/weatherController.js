var WeatherModel = require('../models/weatherModel.js');

/**
 * weatherController.js
 *
 * @description :: Server-side logic for managing weathers.
 */
module.exports = {

    /**
     * weatherController.list()
     */
    list: function (req, res) {
        WeatherModel.find(function (err, weathers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting weather.',
                    error: err
                });
            }

            return res.json(weathers);
        });
    },

    /**
     * weatherController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        WeatherModel.findOne({_id: id}, function (err, weather) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting weather.',
                    error: err
                });
            }

            if (!weather) {
                return res.status(404).json({
                    message: 'No such weather'
                });
            }

            return res.json(weather);
        });
    },

    /**
     * weatherController.create()
     */
    create: function (req, res) {
        var weather = new WeatherModel({
			temp : req.body.temp,
			wind : req.body.wind,
			humidity : req.body.humidity,
			cloudiness : req.body.cloudiness,
			rain : req.body.rain
        });

        weather.save(function (err, weather) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating weather',
                    error: err
                });
            }

            return res.status(201).json(weather);
        });
    },

    /**
     * weatherController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        WeatherModel.findOne({_id: id}, function (err, weather) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting weather',
                    error: err
                });
            }

            if (!weather) {
                return res.status(404).json({
                    message: 'No such weather'
                });
            }

            weather.temp = req.body.temp ? req.body.temp : weather.temp;
			weather.wind = req.body.wind ? req.body.wind : weather.wind;
			weather.humidity = req.body.humidity ? req.body.humidity : weather.humidity;
			weather.cloudiness = req.body.cloudiness ? req.body.cloudiness : weather.cloudiness;
			weather.rain = req.body.rain ? req.body.rain : weather.rain;
			
            weather.save(function (err, weather) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating weather.',
                        error: err
                    });
                }

                return res.json(weather);
            });
        });
    },

    /**
     * weatherController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        WeatherModel.findByIdAndRemove(id, function (err, weather) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the weather.',
                    error: err
                });
            }

            return res.status(204).json(weather?.view() || {});
        });
    }
};
