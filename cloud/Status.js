
////////////////////////
//MODULE DEPENDENCIES //
////////////////////////
var Type = require('cloud/utils/TypeUtils.js'),
    Permissions = require('cloud/utils/Permissions.js'),
    Parser = require('cloud/utils/Parser.js'),

    //////////////
    //CONSTANTS //
    //////////////
    _properties = {
      OWNER: 'owner',
      CONTENTS: 'contents',
      CONJUGATIONS: 'conjugations',
      USER_NAME: 'username',
      MENTIONS: 'mentions',
      KEYWORDS: 'keywords'
    },
    _classes = {
      KEYWORD: 'Keyword',
    },
    _messages = {
      ANONYMOUS_USER:'You must be logged in to do that',
      EMPTY_CONTENTS: 'Content must be non-empty',
      UNKNOWN_MENTIONS: 'Content contains mentions of unknown users'
    }

    //////////
    //CACHE //
    //////////
    _requestCache = {};

///////////////
//VALIDATION //
///////////////
Parse.Cloud.beforeSave("Status", function(request, response) {
  var status = request.object,
      user = request.user;

  //empty request cache
  _requestCache = {};

  //set ownership and permission data
  if(status.isNew()) {
   Permissions.setUserAsOwner(user, status);
  }

  if(Type.isNullOrEmpty(status.get(_properties.CONTENTS))) {
    response.error(_messages.EMPTY_CONTENTS);
  }else{
    Parser.parseKeywords(status).then(function (result) {
      return Parser.parseMentions(status);
    }).then(function (results) {
      if(!_requestCache.unknownUsers) {
        response.success();
      } else {
        response.error({
          message: _messages.UNKNOWN_MENTIONS,
          unknownUsers: _requestCache.unknownUsers
        })
      }
    });
  }
});
