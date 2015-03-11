////////////////////////
//MODULE DEPENDENCIES //
////////////////////////
var Permissions = require('cloud/utils/Permissions.js'),
    TypeUtils = require('cloud/utils/TypeUtils.js'),
    Parser = require('cloud/utils/Parser.js'),

    _cache = {},

    _classes = {
      TEAM: 'Team'
    },
    _properties = {
      NAME: 'name',
      USERNAME: 'username',
      MEMBERS: 'members'
    };

Parse.Cloud.beforeSave(_classes.TEAM, function (request, response) {
  if(request.object.isNew()) {
   Permissions.setUserAsOwner(request.user, request.object);
  }
  response.success();
});

Parse.Cloud.define("getTeamInfo", function (request, response) {
  var teamQuery = new Parse.Query(_classes.TEAM);
  teamQuery.equalTo(_properties.NAME, request.params.team);
  teamQuery.find(function(team) {
    response.success(team);
  });
});

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

  resolutions = [resolveTeam(request.params.name), resolveUsers(newMembers)];

  Parse.Promise.when(resolutions).then(function(result){
    console.log(_cache);
    var relation = _cache.team.relation(_properties.MEMBERS);
    _cache.users.forEach(function(user){
      relation.add(user);
    })
    _cache.team.save();
  });
});

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