var express = require('express');
var router = express.Router();

const IntegrationController = require('../controllers/integration');

router.post('/companies', async function (req, res, next) {
  try {
    const integrationResult = await IntegrationController.integrateCompanies(req, res, next);
    return res.send({ ...integrationResult });
  } catch (error) {
    return next(error);
  }
});

router.post('/contacts', async function (req, res, next) {
  try {
    const integrationResult = await IntegrationController.integrateContacts(req, res, next);
    return res.send({ ...integrationResult });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
