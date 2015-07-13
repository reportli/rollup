define([
  'backbone',
  'marionette',
  'views/MainView',
  'views/TodosView',
  'views/NewTodoControl',
  'controllers/TodoListController',
  'collections/TodosCollection',
  'collections/helpers/Comparators'
  ],

  function(
    Backbone,
    Marionette,
    MainView,
    TodosView,
    NewTodoControl,
    TodoListController,
    TodosCollection,
    Comparators
    ){

    var activePageController;

    /**
     * The "Super Controller" - responds to routes and manages sub-controllers
     * @exports controllers/TodoController
     */
    var TodoController = {
      activePageController: {},
      /**
       * Handles the "home" route, setting up the appropriate views and collections
       * @return {undefined} [undefined]
       */
      home: function() {
        //Initialize instances & connect references
        this.setActivePageController(TodoListController);
      },

      /**
       * Handles the "archive" route
       * @return {undefined} undefined
       */
      archive: function() {
        console.log("We're in the archive!");
      },

      /**
       * Sets the active page controller by creating a new controller
       * or resetting the current controller
       * @param {object} ControllerClass The controller class to instantiate
       * @param {object} options         options to be passed to ControllerClass constructor
       */
      setActivePageController: function (ControllerClass, options) {
        options = options || {};

        //If the active page controller is an instance of
        //the ControllerClass we're trying to instantiate
        //simply reset it instead of creating a new instance
        if (activePageController instanceof ControllerClass) {
          if (options.reset && _.isFunction(activePageController.reset)) {
            activePageController.reset();
          }
          return;
        }

        if (activePageController) {
          activePageController.destroy();
        }

        activePageController = new ControllerClass(options);
      }
    };

    return TodoController;
});
