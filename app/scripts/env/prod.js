app.constant('API', (function() {
  var endpoint = 'http://zeusapp.com.br:6660';

  return {
    LOGIN: endpoint + '/login',
    HOME: endpoint + '/home'
  }

}()));

