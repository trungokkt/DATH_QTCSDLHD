const basketService = require('../service/basketService');

module.exports = (config) => {
    const log = config.logger;
    const basket = basketService(config.redis.client);

    getBasket = async function (req, res) {
        const basketItems = await basket.getAll(res.userId);
        return res.send({ basketItems });
    }
    deleteBasket = async function (req, res, next) {
        try {
            await basket.remove(req.userId, req.body.customerId);
        } catch (error) {
            res.status(400).send(error);
        }

        return res.redirect('/basket');
    }
    addBasket = async function (req,res,next) {
        try {
            await basket.add(res.userId);
          } catch (err) {
            log.fatal(err);
          }
    }
    deleteBasket = async function (req, res, next) {
        try {
            await basket.remove(req.userId, req.body.customerId);
        } catch (error) {
            res.status(400).send(error);
        }

        return res.redirect('/basket');
    }
};