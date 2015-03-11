/**
 * Adds users to the generic 'valid user' role immediately after creation.
 * This should only be performed on new users.
 * @param  {Object} request   request object (contains user that was just saved as 'request.object')
 * @param  {Object}  response  response object
 * @return {undefined}           undefined
 */

///////////////
//VALIDATION //
///////////////
Parse.Cloud.afterSave(Parse.User, function (request, response) {
  if(request.object.isNew()) {
    var validUserRoleQuery = new Parse.Query(Parse.Role);
    validUserRoleQuery.equalTo('name', 'validUser');
    validUserRoleQuery.first(function (validUserRole) {
      validUserRole.getUsers().add(request.object);
      return validUserRole.save();
    }).then(function (savedRole) {
      response.success();
    });
  } else {
    response.success();
  }
});