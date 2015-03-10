var Type = require('cloud/utils/TypeUtils.js');

Parse.Cloud.beforeSave("Status", function(request, response) {
  var contents = request.object.get("contents");
  if(Type.isNullOrEmpty(contents)) {
    response.error("you cannot save a status without contents");
  }else{
    parseKeywords(contents).then(function (result) {
      console.log(result);
    });  
  } 
});

function parseKeywords (contents, response) {
  var keywordQuery = new Parse.Query('Keyword'),
      prom = new Parse.Promise();

  keywordQuery.find().then(function (results) {
    console.log(results);
    response.success('yolo');
  });
  return prom;
}