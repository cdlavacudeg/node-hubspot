var express = require('express');
const MigrationController = require('../controllers/migration');
var router = express.Router();

/* Migrate the contact and company data from rick and morty api */
router.post('/', async function (req, res, next) {
  try {
    const migrationResult = await MigrationController.migrate();
    return res.send({ ...migrationResult });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
