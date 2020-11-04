export const environment = {
  production: true,
  urlBase: 'http://localhost:8080',
  urlWebsocket: '/gs-guide-websocket',
  oauthClientId: 'acme',
  oauthSecret: 'acmesecret',
};

// default settings for how to query the endpoint
export const yasgui = {
  // Fuseki
  endpoint: 'https://query.wikidata.org/sparql',
  method: 'POST',
};
