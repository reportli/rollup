//////////////
//CONSTANTS //
//////////////
var _properties = {
      OWNER: 'owner'
    }

/**
 * Sets user as owner of object.  Assigns property on object called
 * 'owner' and sets acl to public read, write only for this user
 * @param {Parse.User} user   Parse User object
 * @param {Object} object Parse.Object
 */
exports.setUserAsOwner = function (user, object) {
  var defaultPermissions = new Parse.ACL(Parse.User.current());
  object.set(_properties.OWNER, user);
  defaultPermissions.setPublicReadAccess(true);
  object.setACL(defaultPermissions);
}