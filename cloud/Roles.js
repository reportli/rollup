
var _roles = {
      VALID_USER_ROLE: 'validUser'
    },
    _properties = {
      NAME: 'name',
      USERNAME: 'username'
    };


/**
 * Adds users to the generic 'valid user' role immediately after creation.
 * This should only be performed on new users.
 */
Parse.Cloud.afterSave(Parse.User, function (request) {
  var user = request.object,
      validUserRoleQuery = new Parse.Query(Parse.Role);

  validUserRoleQuery.equalTo(_properties.NAME, _roles.VALID_USER_ROLE);
  validUserRoleQuery.first().then(function (validUserRole) {
    var validUsersRelation = validUserRole.getUsers();
    var validUsersQuery = validUsersRelation.query();
    validUsersQuery.equalTo(_properties.USERNAME, user.get(_properties.USERNAME));
    validUsersQuery.find().then(function (results){
      if(results.length === 0) {
        validUsersRelation.add(user);
        validUserRole.save();
      }
    })
  });
});