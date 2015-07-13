/**
 * @module collections/TodoCollection
 */
define([
  'backbone', 
  'marionette', 
  'models/ReportModel'
  ],
  function(Backbone, Marionette, Todo){
    var Reports = Backbone.Collection.extend({
      model: Todo
    });
    return Reports;
});