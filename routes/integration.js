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
          location_id,
          name,
          location_type,
          dimension,
          creation_date,
        },
      },
      { accessToken: accessTokenMirror }
    );
    return res.send({ createCompanyResponse });
  }

  const companyObj = {
    properties: {
      location_id,
      name,
      location_type,
      dimension,
      creation_date,
    },
  };

  const updateCompanyResponse = await HubSpotHelper.updateCompany(company.id, companyObj, {
    accessToken: accessTokenMirror,
  });

  return res.send({ updateCompanyResponse });
});

router.post('/contacts', async function (req, res, next) {
  const { character_id } = req.body;
  let contact;
  try {
    const PublicObjectSearchRequest = {
      limit: 1,
      after: 0,
      sorts: ['character_id'],
      properties: [
        'character_id',
        'lastname',
        'firstname',
        'character_gender',
        'status_character',
        'character_species',
      ],
      filterGroups: [{ filters: [{ propertyName: 'location_id', value: character_id, operator: 'EQ' }] }],
    };

    const searchContacts = await HubSpotHelper.searchContacts(PublicObjectSearchRequest, {
      accessToken: accessTokenMirror,
    });

    contact = searchContacts.results[0];
  } catch (error) {
    contact = null;
  }

  const { firstname, lastname, status_character, character_species, character_gender } = req.body;
  if (!contact) {
    const createContactResponse = await HubSpotHelper.createCompany(
      {
        properties: {
          character_id,
          firstname,
          lastname,
          status_character,
          character_species,
          character_gender,
        },
      },
      { accessToken: accessTokenMirror }
    );
    return res.send({ createContactResponse });
  }

  const contactObj = {
    properties: {
      character_id,
      firstname,
      lastname,
      status_character,
      character_species,
      character_gender,
    },
  };

  const updateCompanyResponse = await HubSpotHelper.updateContact(contact.id, contactObj, {
    accessToken: accessTokenMirror,
  });

  return res.send({ updateCompanyResponse });
});

module.exports = router;
