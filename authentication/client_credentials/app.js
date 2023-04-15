/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

var request = require("request"); // "Request" library

/* var client_id = 'CLIENT_ID'; // Your client id
 * var client_secret = 'CLIENT_SECRET'; // Your secret
 */
var client_id = '0993b2761d9648b788b9c080f4142dd0'; // Your client id
var client_secret = '7ec93660812a4b4f9bcb832439317473'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var access_token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    request.get(options, function (error, response, body) {
      console.log(body);
    });
  }
});
