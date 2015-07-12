/**
 * Checks to see if a value is an empty string or a null object
 * @param  {*}  val value to check
 * @return {Boolean}     returns true if null or empty, false if not empty and not null
 */
exports.isNullOrEmpty = function (val) {
  if(val === '' || val === ' ' || !val) {
    return true;
  }
  return false;
}