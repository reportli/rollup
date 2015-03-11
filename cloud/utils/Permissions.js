//////////////
//CONSTANTS //
//////////////
var _properties = {
      OWNER: 'owner'
    }

/////////////////////
//PERMISSION UTILS //
/////////////////////
exports.setUserAsOwner = function (user, object) {
  var defaultPermissions = new Parse.ACL(Parse.User.current());
  object.set(_properties.OWNER, user);
  defaultPermissions.setPublicReadAccess(true);
  object.setACL(defaultPermissions);
}