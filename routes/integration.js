var express = require('express');
var router = express.Router();

router.post('/companies', async function (req, res, next) {
  return res.json({
    message: 'PUT /integration/companies',
    body: req.body,
  });
});

router.post('/contacts', async function (req, res, next) {
  return res.json({
    message: 'PUT /integration/contacts',
    body: req.body,
  });
});

module.exports = router;
