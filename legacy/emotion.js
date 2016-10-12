//Import Watson Analytics//
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: 'd4576505b093e0997a1603c4e965f2e28f5b59f1'
});

//Define text Parameters //
var parameters = {
  text: "This is a test."
};

//Call Alchemy API emotion function//
alchemy_language.emotion(parameters, function (err, response) {
   if (err)
     console.log('error:', err);
   else
     console.log(JSON.stringify(response, null, 2));
});

//Print to console//
console.log(parameters.text)
