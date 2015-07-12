/**
 * @module collections/TodoCollection
 */
define(['backbone', 'marionette', 'models/TodoModel'],
  function(Backbone, Marionette, Todo){
    var Todos = Backbone.Collection.extend({
      model: Todo
    });
    return Todos;
});