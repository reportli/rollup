////////////////////////
//MODULE DEPENDENCIES //
////////////////////////
var Permissions = require('cloud/utils/Permissions.js'),
    TypeUtils = require('cloud/utils/TypeUtils.js'),
    Parser = require('cloud/utils/Parser.js'),
    Users = require('cloud/Users.js'),

    _cache = {},

    _classes = {
      TEAM: 'Team'
    },
    _properties = {
      NAME: 'name',
      USERNAME: 'username',
      MEMBERS: 'members',
      TEAMS: 'teams'
    };

Parse.Cloud.beforeSave(_classes.TEAM, function (request, response) {
  if(request.object.isNew()) {
   Permissions.setUserAsOwner(request.user, request.object);
  }
  response.success();
});

/**
 * Returns team information and stuff
 */
Parse.Cloud.define("getTeamInfo", function (request, response) {
  var lookups = [resolveTeam(request.params.team)];
  _cache = {
    members: [],
    team: {}
  };

  resolveTeam(request.params.team).then(function(){
    var membersRelation = _cache.team.relation(_properties.MEMBERS);
    membersRelation.query().find().then(function(members) {
      _cache.members = members;
      response.success(_cache);
    });
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

  resolutions = [resolveTeam(request.params.team), Users.resolveUserNames(newMembers, _cache)];

  Parse.Promise.when(resolutions).then(function(result){
    var relation = _cache.team.relation(_properties.MEMBERS);
    _cache.users.forEach(function(user){
      relation.add(user);
    });
    _cache.team.save().then(function () {
      var lookups = [];
      _cache.users.forEach(function (user) {
        user.relation(_properties.TEAMS).add(_cache.team);
        Parse.Cloud.useMasterKey();
        lookups.push(user.save());
      });
      return Parse.Promise.when(lookups);
    }).then(function () {
      response.success();
    })
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

