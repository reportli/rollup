exports._regex = {
  MENTION: /\B@[a-z0-9_-]+/gi
}

/**
 * Looks for '@' mentions inside a string
 * @param  {String} message String containing '@' mentions
 * @return {Array}         Array of strings where each element is an '@' mention (i.e. ['@jasonbelmonti','@shaneafsar'])
 */
exports.parseMentions = function (message) {
  return message.match(this._regex.MENTION);
}

exports.parseUserNamesFromMentions = function (mentions) {
  var userNames = [];
  mentions.forEach(function (mention) {
    userNames.push(mention.substring(1, mention.length));
  });
  return userNames;
}

exports.parseUserNames = function (message) {
  console.log(message);
  return this.parseUserNamesFromMentions(this.parseMentions(message));
}

/**
 * Searches status content looking for recognized conjugations of valid keywords
 * @param  {Status} status the status object to parse
 * @return {Parse.Promise}        a promise that resolves once keywords have been retrieved
 */
exports.parseKeywords = (status) {
  var contents = status.get(_properties.CONTENTS),
      tokenizedContents = contents.split(' '),
      keywordQuery = new Parse.Query(_classes.KEYWORD);

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
exports.parseMentions (status) {
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