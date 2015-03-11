
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
    parseKeywords(status).then(function (result) {
      return parseMentions(status);
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

/**
 * Searches status content looking for recognized conjugations of valid keywords
 * @param  {Status} status the status object to parse
 * @return {Parse.Promise}        a promise that resolves once keywords have been retrieved
 */
function parseKeywords (status) {
  var contents = status.get(_properties.CONTENTS),
      tokenizedContents = contents.split(' '),
      keywordQuery = new Parse.Query(_classes.KEYWORD),
      keywordPromise = new Parse.Promise();

  return keywordQuery.find().then(function (keywords) {
    var matchedKeywords = [];
    keywords.forEach(function (keyword) {
      keyword.get(_properties.CONJUGATIONS).forEach(function (conjugation) {
        tokenizedContents.forEach(function (token) {
          if(token.toLowerCase() === conjugation.toLowerCase()) {
            status.addUnique(_properties.KEYWORDS, keyword);
          }
        });
      });
    });
  });
}

/**
 * Searches status content looking for mentions of other usernames that being with a '@' symbol
 * @param  {Status} status the status object to parse
 * @return {Parse.Promise}        a promise that resolves when all '@' mentions have been resolved to users
 */
function parseMentions (status) {
  var contents = status.get(_properties.CONTENTS),
      userNames =[],
      mentions = Parser.parseMentions(contents),
      mentionsRelation = status.relation(_properties.MENTIONS),
      mentionsPromises = [];

  if(mentions) {
    //This user lookup functionality should be broken off into its own module
    Parser.parseUserNamesFromMentions(mentions).forEach(function (userName) {
      var userQuery = new Parse.Query(Parse.User);
      userQuery.equalTo(_properties.USER_NAME, userName);
      mentionsPromises.push(userQuery.find({
        success: function (mentionedUser) {
          if(mentionedUser.length !== 0) {
            mentionsRelation.add(mentionedUser);
          } else {
            if(!_requestCache.unknownUsers) {
              _requestCache.unknownUsers = [];
            }
            _requestCache.unknownUsers.push(userName);
          }
        }
        //Handle unknown users here
      }));
    });
  }

  return Parse.Promise.when(mentionsPromises);
}