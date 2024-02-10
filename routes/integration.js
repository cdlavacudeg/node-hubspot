var express = require('express');
const HubSpotHelper = require('../helpers/hubSpot');
var router = express.Router();

const accessTokenMirror = process.env.ACCESS_TOKEN_MIRROR;

router.post('/companies', async function (req, res, next) {
  const { location_id } = req.body;
  let company;
  try {
    const PublicObjectSearchRequest = {
      limit: 1,
      after: 0,
      sorts: ['location_id'],
      properties: ['location_id,name,location_type,dimension,creation_date,hs_object_id'],
      filterGroups: [{ filters: [{ propertyName: 'location_id', value: location_id, operator: 'EQ' }] }],
    };

    const searchCompanies = await HubSpotHelper.searchCompanies(PublicObjectSearchRequest, {
      accessToken: accessTokenMirror,
    });

    company = searchCompanies.results[0];
  } catch (error) {
    company = null;
  }
  const { dimension, creation_date, name, location_type } = req.body;
  if (!company) {
    const createCompanyResponse = await HubSpotHelper.createCompany(
      {
        properties: {
          location_id: location_id,
          name: name,
          location_type: location_type,
          dimension: dimension,
          creation_date: creation_date,
        },
      },
      { accessToken: accessTokenMirror }
    );
    return res.send({ createCompanyResponse });
  }

  const companyObj = {
    properties: {
      location_id: location_id,
      name: name,
      location_type: location_type,
      dimension: dimension,
      creation_date: creation_date,
    },
  };

  const updateCompanyResponse = await HubSpotHelper.updateCompany(company.id, companyObj, {
    accessToken: accessTokenMirror,
  });

  return res.send({ companyObj, company, updateCompanyResponse });
});

router.post('/contacts', async function (req, res, next) {
  return res.json({
    message: 'PUT /integration/contacts',
    body: req.body,
  });
});

module.exports = router;
