var express = require('express');
var router = express.Router();

const { getCharacter, getLocation } = require('rickmortyapi');

/* Migrate the contact and company data from rick and morty api */
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
      // }
    }
  });

  const locations = await getLocation(idLocations);

  res.send({ characters: characters?.data, locations: locations?.data });
});

module.exports = router;
