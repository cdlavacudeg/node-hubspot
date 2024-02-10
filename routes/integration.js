var express = require('express');
var router = express.Router();

const IntegrationController = require('../controllers/integration');
const Response = require('../helpers/response');

// Integration to mirror companies
router.post('/companies', async function (req, res, next) {
  try {
    const integrationResult = await IntegrationController.integrateCompanies(req, res, next);
    return Response.success(req, res, 'Companies integrated', integrationResult, 200);
  } catch (error) {
    return next(error);
  }
});

// Integration to mirror contacts
router.post('/contacts', async function (req, res, next) {
  try {
    const integrationResult = await IntegrationController.integrateContacts(req, res, next);
    return Response.success(req, res, 'Contacts integrated', integrationResult, 200);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
