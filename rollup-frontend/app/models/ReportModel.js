/**
 * The model for persisting individual todo items
 * @module models/ReportModel
 */
define(['backbone'],
  function(Backbone){
    var Report = Parse.Object.extend("Status", {
      defaults: {
        isDone: false,
      }
    });
    return Report;
});