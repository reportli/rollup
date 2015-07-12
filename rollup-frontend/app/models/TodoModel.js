/**
 * The model for persisting individual todo items
 * @module models/TodoModel
 */
define(['backbone'],
  function(Backbone){
    var Todo = Backbone.Model.extend({
      defaults: {
        isDone: false,
      }
    });
    return Todo;
});