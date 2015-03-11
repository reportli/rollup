exports._regex = {
  MENTION: /\B@[a-z0-9_-]+/gi
}


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