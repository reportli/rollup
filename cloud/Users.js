/**
 * @namespace Users
 */
////////////////////////
//MODULE DEPENDENCIES //
////////////////////////
var Permissions = require('cloud/utils/Permissions.js'),
    TypeUtils = require('cloud/utils/TypeUtils.js'),
    Parser = require('cloud/utils/Parser.js'),

    _classes = {
      STATUS: 'Status'
    },

    _properties = {
      USERNAME: 'username'
    };

/**
 * Resolves an array of usernames to user objects
 * @memberOf Users
 * @param  {Array} userNames An array of usernames
 * @return {Parse.Promise}           A promise that resolves when all user lookups have been completed
 */
exports.resolveUserNames = function (userNames, _cache) {
  var userLookups = [];

  userNames.forEach(function (userName) {
    var userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo(_properties.USERNAME, userName);
    userLookups.push(userQuery.first(function (user) {
      _cache.users.push(user);
    }));
  });
  return new Parse.Promise.when(userLookups);
}