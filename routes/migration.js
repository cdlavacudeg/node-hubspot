var express = require('express');
var router = express.Router();

const MigrationController = require('../controllers/migration');
const Response = require('../helpers/response');

/* Migrate the contact and company data from rick and morty api */
router.post('/', async function (req, res, next) {
  try {
    const migrationResult = await MigrationController.migrate();
    return Response.success(req, res, 'Migration completed', migrationResult, 201);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
