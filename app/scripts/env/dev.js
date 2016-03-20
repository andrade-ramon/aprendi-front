app.constant('API', (function() {
  var endpoint = 'http://localhost:6660';

  return {
    LOGIN: endpoint + '/login',
    HOME: endpoint + '/home'
  }

}()));


