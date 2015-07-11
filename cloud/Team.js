////////////////////////
//MODULE DEPENDENCIES //
////////////////////////
var Permissions = require('cloud/utils/Permissions.js'),
    TypeUtils = require('cloud/utils/TypeUtils.js'),
    Parser = require('cloud/utils/Parser.js'),
    Users = require('cloud/Users.js'),

    //////////////
    //CONSTANTS //
    //////////////
    _classes = {
      TEAM: 'Team'
    },
    _properties = {
      NAME: 'name',
      USERNAME: 'username',
      MEMBERS: 'members',
      TEAMS: 'teams'
    },

    /////////////////////
    //DEFAULT SETTINGS //
    /////////////////////
    _defaultSettings = {

    };

Parse.Cloud.define("createTeam", function(request, resposne){
  var newTeam = Parse.Object.extend(_classes.TEAM);
  newTeam.set(_properties.NAME, request.params.name);
  newTeam.save();
});

/**
 * Gets team information
 * @param  {[type]} request   [description]
 * @param  {Parse}  response) {             var teamQuery [description]
 * @return {[type]}           [description]
 */
Parse.Cloud.define("getTeamInfo", function (request, response) {
  var teamInfo = {
    members: [],
    team: {}
  };

  resolveTeam(request.params.team).then(function(team){
    var membersRelation = team.relation(_properties.MEMBERS);
    teamInfo.team = team;
    membersRelation.query().find().then(function(members) {
      teamInfo.members = members;
      response.success(teamInfo);
    });
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

  resolutions = [resolveTeam(request.params.team), Users.resolveUserNames(newMembers)];

  Parse.Promise.when(resolutions).then(function(team, users){
    var relation = team.relation(_properties.MEMBERS);
    users.forEach(function(user){
      relation.add(user);
    });
    team.save().then(function () {
      var lookups = [];
      users.forEach(function (user) {
        user.relation(_properties.TEAMS).add(team);
        Parse.Cloud.useMasterKey();
        lookups.push(user.save());
      });
      return Parse.Promise.when(lookups);
    }).then(function () {
      response.success();
    })
  });
});

Parse.Cloud.define("inviteMemberToTeam", function(request, response) {
  resolveTeam(request.params.team).then(function(){
  })
});


/**
 * Joins current user to team
 * @param  {String} team A team name
 */
Parse.Cloud.define("joinTeam", function(request, response) {
  resolveTeam(request.params.team).then(function(team){
    if(team.get('private') === true) {
      response.error('You must have an invite to join this team');
    }else{
      var membersRelation = team.relation("members");
      membersRelation.add(Parse.User.current());
      team.save().then(function(){
        response.success('Joined successfully');
      });
    }
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
    teamLookup.resolve(team);
  });
  return teamLookup;
}

