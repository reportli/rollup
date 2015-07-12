/**
 * The data controller
 * @module controllers/DataController
 */
define(['backbone',
        'marionette',
        'models/TodoModel',
        'views/MainView',
        'views/TodosView',
        'views/NewTodoControl',
        'collections/TodosCollection',
        'collections/helpers/Comparators'],
  function(Backbone, Marionette, TodoModel, MainView, TodosView, NewTodoControl, TodosCollection, Comparators){


    var TodoListController = Backbone.Marionette.Object.extend({

      todos: {},
      completedTodos: {},
      /**
       * Caches references to todos and completed todos,
       * binds events.
       * @param {object} options an object containing references to the todos and completed todos collections
       */
      initialize: function(options) {
        this.todos = new TodosCollection(),
        this.completedTodos = new TodosCollection();
        var mainView        = new MainView({ el: '#app-1'}),
        //View for todos that have not yet been completed
        todosView       = new TodosView({
                              id: '#todos-list',
                              collection: this.todos,
                              viewComparator: Comparators.simpleReverse('created')
                            }),
        //View for todos that have been completed
        completedView =   new TodosView({
                              id: '#completed-list',
                              collection: this.completedTodos,
                              viewComparator: Comparators.simpleReverse('completed')
                            }),
        newTodoControl  = new NewTodoControl(this);

        //Render main view
        mainView.render();

        //Render sub-views in regions
        mainView.getRegion('newTodo').show(newTodoControl);
        mainView.getRegion('todos').show(todosView);
        mainView.getRegion('completed').show(completedView);

        //Listen for the removal of models from the todos collection,
        //this means they have been completed!
        this.listenTo(this.todos, 'remove', this.completeTodo);
      },


      /**
       * Creates a new todo model and inserts it into the todos collection
       * @instance
       * @param  {string} text the content of the todo item
       * @return {undefined}      undefined
       */
      newTodo: function (text) {
        console.log(this);
        this.todos.add(new TodoModel({
                                      content: text,
                                      created: new Date().getTime()
                                     }));
      },

      /**
       * Adds the model passed as the argument to the completedTodos collection
       * @instance
       * @param  {Backbone.Model} model the completed todo to add to the completedTodo collection
       * @return {undefined}       undefinded
       */
      completeTodo: function (model) {
        this.completedTodos.add(model);
      }
    });

    return TodoListController;
});