/**
 * @module views/TodosView
 */
define(['backbone', 'marionette', 'views/TodoItemView'],
  function(Backbone, Marionette, TodoItemView){
    var TodosView = Backbone.Marionette.CollectionView.extend({
        tagName: 'ol',
        childView: TodoItemView,
      });
    return TodosView;
});