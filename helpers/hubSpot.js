const hubspot = require('@hubspot/api-client');
const { AssociationTypes } = hubspot;
const hubspotClient = new hubspot.Client({
  accessToken: process.env.ACCESS_TOKEN,
});

const hubspotClientMirror = new hubspot.Client({
  accessToken: process.env.ACCESS_TOKEN_MIRROR,
});

class HubSpotHelper {
  static async getCompany(companyId, { accessToken } = {}) {
    let hubspotClientGet = hubspotClient;
    if (accessToken && accessToken != process.env.ACCESS_TOKEN) {
      hubspotClientGet = hubspotClientMirror;
    }

    const getCompanyResponse = await hubspotClientGet.crm.companies.basicApi.getById(companyId, [
      'location_id,name,location_type,dimension,creation_date,hs_object_id',
    ]);
    return getCompanyResponse;
  }

  static async searchCompanies(PublicObjectSearchRequest, { accessToken } = {}) {
    let hubspotClientSearch = hubspotClient;
    if (accessToken && accessToken != process.env.ACCESS_TOKEN) {
      hubspotClientSearch = hubspotClientMirror;
    }

    const apiResponse = await hubspotClientSearch.crm.companies.searchApi.doSearch(PublicObjectSearchRequest);
    return apiResponse;
  }

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
      hubspotClientCreate = hubspotClientMirror;
    }
    const createCompanyResponse = await hubspotClientCreate.crm.companies.basicApi.create(companyObj);
    return createCompanyResponse;
  }

  static async updateCompany(companyId, companyObj, { accessToken } = {}) {
    // const companyObj = {
    //   properties: {
    //    location_id: companyObj.properties.location_id,
    //    name: companyObj.properties.name,
    //    location_type: companyObj.properties.location_type,
    //    dimension: companyObj.properties.dimension,
    //    creation_date: companyObj.properties.creation_date,
    //   },
    // };
    let hubspotClientUpdate = hubspotClient;
    if (accessToken && accessToken != process.env.ACCESS_TOKEN) {
      hubspotClientUpdate = hubspotClientMirror;
    }

    const updateCompanyResponse = await hubspotClientUpdate.crm.companies.basicApi.update(companyId, companyObj);
    return updateCompanyResponse;
  }

  static async searchContacts(PublicObjectSearchRequest, { accessToken } = {}) {
    let hubspotClientSearch = hubspotClient;
    if (accessToken && accessToken != process.env.ACCESS_TOKEN) {
      hubspotClientSearch = hubspotClientMirror;
    }

    const apiResponse = await hubspotClientSearch.crm.contacts.searchApi.doSearch(PublicObjectSearchRequest);
    return apiResponse;
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
      hubspotClientCreate = hubspotClientMirror;
    }
    const createContactResponse = await hubspotClientCreate.crm.contacts.basicApi.create(contactObj);
    return createContactResponse;
  }

  static async updateContact(contactId, contactObj, { accessToken } = {}) {
    let hubspotClientUpdate = hubspotClient;
    if (accessToken && accessToken != process.env.ACCESS_TOKEN) {
      hubspotClientUpdate = hubspotClientMirror;
    }

    const updateCompanyResponse = await hubspotClientUpdate.crm.contacts.basicApi.update(contactId, contactObj);
    return updateCompanyResponse;
  }

  static async createAssociation(contactId, companyId, { accessToken } = {}) {
    let hubspotClientCreate = hubspotClient;
    if (accessToken && accessToken != process.env.ACCESS_TOKEN) {
      hubspotClientCreate = hubspotClientMirror;
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
