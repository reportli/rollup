define(['backbone', 'marionette'],
  function(Backbone, Marionette) {
    /**
     * Provides shared comparator functions for collections
     * @exports collections/helpers/Comparators
     */
    var Comparators = {

      /**
       * Sorts, in reverse, by a specified property
       * @param  {string}   name property to sort by
       * @return {function}      comparator function
       */
      simpleReverse: function (name) {
        return function (item) {
          return -item.get(name);
        }
      }
    }
    return Comparators;
});