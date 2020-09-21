export const environment = {
  production: true,
  urlBase: 'http://localhost:8080',
  urlWebsocket: '/gs-guide-websocket',
  oauthClientId: 'acme',
  oauthSecret: 'acmesecret'
};

// default settings for how to query the endpoint
export const yasgui = {
  // Wikibase:
  // endpoint: 'http://herc-iz-front-desa.atica.um.es/proxy/wdqs/bigdata/namespace/wdq/sparql',
  // method: 'GET'

  // Fuseki
  endpoint: 'http://herc-iz-bd-desa.atica.um.es:3030/trellis/query',
  method: 'POST'
}