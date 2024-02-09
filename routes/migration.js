var express = require('express');
var router = express.Router();

const { getCharacter, getLocation } = require('rickmortyapi');
const hubspot = require('@hubspot/api-client');
const { AssociationTypes } = hubspot;
const hubspotClient = new hubspot.Client({
  accessToken: process.env.ACCESS_TOKEN,
}); /* Migrate the contact and company data from rick and morty api */
router.post('/', async function (req, res, next) {
  const totalCharacters = 826;
  // 1 and the prime characters
  const idCharacters = [1];

  // Considers only prime numbers
  for (let idCharacter = 2; idCharacter <= totalCharacters; idCharacter++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(idCharacter); j++) {
      if (idCharacter % j === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      idCharacters.push(idCharacter);
    }
  }

  const characters = await getCharacter(idCharacters);

  const idLocations = [];

  // Extract the location id related with the prime characters
  characters?.data.forEach((character) => {
    const locationUrl = character.location.url;
    // Use a regular expression to extract the last number
    const matches = locationUrl.match(/\/(\d+)$/);
    // Check if there is a match and extract the captured number
    if (matches) {
      const idLocation = parseInt(matches[1]);
      // const isInArray = idLocations.includes(idLocation);
      // if (!isInArray) {
      idLocations.push(idLocation);
      character.idLocation = idLocation;
      // }
    }
  });

  const locations = await getLocation(idLocations);

  const associationIds = {};

  for (let location of locations.data) {
    const companyObj = {
      properties: {
        location_id: location.id,
        name: location.name,
        location_type: location.type,
        dimension: location.dimension,
        creation_date: location.created,
      },
    };
    const createCompanyResponse = await hubspotClient.crm.companies.basicApi.create(companyObj);
    associationIds[location.id] = createCompanyResponse.id;
  }

  for (let character of characters.data) {
    const contactObj = {
      properties: {
        character_id: character.id,
        firstname: character.name,
        lastname: character.name,
        status_character: character.status,
        character_species: character.species,
        character_gender: character.gender,
      },
    };
    const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(contactObj);
    if (character.idLocation === undefined) continue;
    await hubspotClient.crm.associations.v4.basicApi.create(
      'companies',
      associationIds[character.idLocation],
      'contacts',
      createContactResponse.id,
      [
        {
          associationCategory: 'HUBSPOT_DEFINED',
          associationTypeId: AssociationTypes.companyToContact,
          // AssociationTypes contains the most popular HubSpot defined association types
        },
      ]
    );
  }

  res.send({ characters: characters?.data, locations: locations?.data });
});

module.exports = router;
