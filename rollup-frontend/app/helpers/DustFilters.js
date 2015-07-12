define([], function(){

  /**
   * Module containing our custom dust filters
   * @exports helpers/DustFilters
   */
  var Filters = {

    /**
     * Returns a string representation of a date (passed as milliseconds since Jan 1, 1970)
     * @instance
     * @param  {number} value  number of milliseconds since midnight of January 1, 1970
     * @return {string}       the default string representation of that date object
     */
    date: function(value) {
      return new Date(value).toString();
    }

  }

  return Filters;
});