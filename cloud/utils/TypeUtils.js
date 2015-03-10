exports.isNullOrEmpty = function (val) {
  if(val === '' || val === ' ' || !val) {
    return true;
  }
  return false;
}