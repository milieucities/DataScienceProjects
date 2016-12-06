//Import Watson Analytics//
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: '03b695fd03eed4dab45e68174b70c70978134712'
});

//Define text Parameters //
var parameters = {
  text: "This is a test.",
  targets: "Test",
};

//Call Alchemy API emotion function//
alchemy_language.sentiment(parameters, function (err, response) {
   if (err)
     console.log('error:', err);
   else
     console.log(JSON.stringify(response, null, 2));
});

//Print to console//
console.log(parameters.text)
