const hubspot = require('@hubspot/api-client');
const { AssociationTypes } = hubspot;
const hubspotClient = new hubspot.Client({
  accessToken: process.env.ACCESS_TOKEN,
});

class HubSpotHelper {
  static async createCompany(companyObj, { accessToken } = {}) {
    // const companyObj = {
    //   properties: {
    //     location_id: location.id,
    //     name: location.name,
    //     location_type: location.type,
    //     dimension: location.dimension,
    //     creation_date: location.created,
    //   },
    // };
    let hubspotClientCreate = hubspotClient;
    if (accessToken && accessToken != process.env.ACCESS_TOKEN) {
      hubspotClientCreate = new hubspot.Client({
        accessToken: accessToken,
      });
    }
    const createCompanyResponse = await hubspotClientCreate.crm.companies.basicApi.create(companyObj);
    return createCompanyResponse;
  }

  static async createContact(contactObj, { accessToken } = {}) {
    // const contactObj = {
    //   properties: {
    //     character_id: character.id,
    //     firstname: character.name,
    //     lastname: character.name,
    //     status_character: character.status,
    //     character_species: character.species,
    //     character_gender: character.gender,
    //   },
    // };
    let hubspotClientCreate = hubspotClient;
    if (accessToken && accessToken != process.env.ACCESS_TOKEN) {
      hubspotClientCreate = new hubspot.Client({
        accessToken: accessToken,
      });
    }
    const createContactResponse = await hubspotClientCreate.crm.contacts.basicApi.create(contactObj);
    return createContactResponse;
  }

  static async createAssociation(contactId, companyId, { accessToken } = {}) {
    let hubspotClientCreate = hubspotClient;
    if (accessToken && accessToken != process.env.ACCESS_TOKEN) {
      hubspotClientCreate = new hubspot.Client({
        accessToken: accessToken,
      });
    }
    const createAssociationResponse = await hubspotClientCreate.crm.associations.v4.basicApi.create(
      'companies',
      companyId,
      'contacts',
      contactId,
      [
        {
          associationCategory: 'HUBSPOT_DEFINED',
          associationTypeId: AssociationTypes.companyToContact,
          // AssociationTypes contains the most popular HubSpot defined association types
        },
      ]
    );
    return createAssociationResponse;
  }
}

module.exports = HubSpotHelper;
