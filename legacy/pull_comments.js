var request = require('request');
request('https://milieu.io/en/dev_sites/1822.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var comment = JSON.parse(body)
    console.log(comment)
  }
})
