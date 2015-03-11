////////////////////////
//MODULE DEPENDENCIES //
////////////////////////
var Permissions = require('cloud/utils/Permissions.js'),
    TypeUtils = require('cloud/utils/TypeUtils.js'),
    Parser = require('cloud/utils/Parser.js'),

    //////////////
    //CONSTANTS //
    //////////////
    _classes = {
      TEAM: 'Team'
    },
    _properties = {
      NAME: 'name',
      USERNAME: 'username',
      MEMBERS: 'members'
    };

    //////////
    //CACHE //
    //////////
    _cache = {},

///////////////
//VALIDATION //
///////////////
Parse.Cloud.beforeSave(_classes.TEAM, function (request, response) {
  var relationQuery = request.object.relation(_properties.MEMBERS).query();
  if(request.object.isNew()) {
   Permissions.setUserAsOwner(request.user, request.object);
  }
  relationQuery.find().then(function(results){
    if(results.length > 0) {
      response.success();
    } else {
      response.error()
    }
  });
});

// Parse.Cloud.define("createTeam", function(request, resposne){
//   var newTeam = Parse.Object.extend(_classes.TEAM);
// });

/**
 * Gets team information
 * @param  {[type]} request   [description]
 * @param  {Parse}  response) {             var teamQuery [description]
 * @return {[type]}           [description]
 */
Parse.Cloud.define("getTeamInfo", function (request, response) {
  var teamQuery = new Parse.Query(_classes.TEAM);
  teamQuery.equalTo(_properties.NAME, request.params.team);
  teamQuery.find(function(team) {
    response.success(team);
  });
});

/**
 * Adds members to a team
 * @param  {Object} request      request object
 * @param  {String} request.params.team  Team name
 * @param  {String} request.params.members  String containing user mentions ('@jasonbelmonti')
 * @return {undefined}           [undefined]
 */
Parse.Cloud.define("addMembersToTeam", function(request, response){
  var newMembers = Parser.parseUserNames(request.params.members),
      teamQuery = new Parse.Query(_classes.TEAM),
      resolvedUsers,
      resolutions,
      unresolvedUsers =[];

  _cache = {
    users: [],
    team: {}
  };

  resolutions = [resolveTeam(request.params.team), resolveUsers(newMembers)];

  Parse.Promise.when(resolutions).then(function(){
    var relation = _cache.team.relation(_properties.MEMBERS);
    _cache.users.forEach(function(user){
      relation.add(user);
    })
    return _cache.team.save();
  });
});

/**
 * Resolves a team name to a Team object
 * @param  {String} teamName A team name
 * @return {Parse.Promise}           Promise that resolves when the team lookup has completed
 */
function resolveTeam (teamName) {
  var teamQuery = new Parse.Query(_classes.TEAM),
      teamLookup = new Parse.Promise();
  teamQuery.equalTo(_properties.NAME, teamName);
  teamQuery.first(function (team) {
    _cache.team = team;
    teamLookup.resolve();
  });
  return teamLookup;
}

//This should be moved to a users module
//and should accept a callback as an argument that
//is passed the lookup results. or something.

/**
 * Resolves an array of user mentions to Parse User objects
 * @param  {Array} userNames An array of user names
 * @return {Parse.Promise}           Promise that resolves when all users lookups have completed
 */
function resolveUsers (userNames) {
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