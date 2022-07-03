const express = require('express');
const basketService = require('../service/basketService');
const { v4: uuidv4 } = require('uuid');

module.exports = (config) => {
  const router = express.Router();
  var basket = basketService(config.redis.client);
  router.get('/', async (req, res, next) => {
    try {
      const basketItems = await basket.getAll(req.userId);
      return res.send({ basketItems });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.delete('/', async (req, res, next) => {
    try {
      const re = await basket.remove(req.userId, req.body.customerId);
      if (!re) {
        throw new Error("error remove", { cause: req.body.customerId })
      }
      const basketItems = await basket.getAll(req.userId);
      return res.send({ basketItems });
    } catch (error) {
      console.log(error.cause)
      res.status(400).send({ error: "error", mesage: error.message, cause: error.cause });
    }
  });
  router.delete('/all', async (req, res, next) => {
    try {
      const re = await basket.removeAll(req.userId);
      if (!re) {
        throw new Error("error remove", { cause: req.userId })
      }
     
      return res.send({ "success" : "removed all cart" });
    } catch (error) {
      console.log(error.cause)
      res.status(400).send({ error: "error", mesage: error.message, cause: error.cause });
    }
  });
  router.post('/', async (req, res) => {
    try {
      customerId = uuidv4()
      const re = await basket.add(req.userId, customerId, req.body);
      if (!re) {
        throw new Error("error add")
      }
      const basketItems = await basket.getAll(req.userId);
      return res.send({ basketItems });
    } catch (error) {
      res.status(400).send(error);
    }
  });
  router.put('/', async (req, res) => {
    try {
      console.log(req.body)

      var data = req.body
      const customerId = data.customerId
      delete data.customerId
      await basket.update(req.userId, customerId, data);
      const basketItems = await basket.getAll(req.userId);
      return res.send({ basketItems });
    } catch (error) {
      res.status(400).send(error);
    }
  });
  return router;
};
