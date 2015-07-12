/**
 * This is the view used to capture user input for new todo items
 * @module views/NewTodoControl
 */
define(['jquery', 'backbone', 'marionette', 'dust'],
  function($, Backbone, Marionette, Dust){

    var NewTodoControl = Marionette.ItemView.extend({
        /**
         * Initializes the control, caches a reference to the controller
         * @param  {object} controller the data controller that manages data operations for this controller
         * @return {undefined}            undefined
         */
        initialize: function(controller) {
          this.controller = controller;
        },

        /**
         * The template used for this control
         * @type {String}
         */
        template: 'NewTodoControl',

        /**
         * Marionette UI hash for this control
         * @type {Object}
         */
        ui: {
          control: '.new-todo-control',
          todos: '.todos-list'
        },

        /**
         * Marionette events hash for this control
         * @type {Object}
         */
        events: {
          'keydown @ui.control': 'handleKeyDown'
        },

        /**
         * Handles keydown events reported by ui control
         * @param  {object} e event
         * @return {undefined}   undefined
         */
        handleKeyDown: function(e) {
          var $handle = $(this.ui.control),
              val = $handle.val();
          //If we press the enter key
          if(e.keyCode === 13 && val !== undefined && val !=='') {
            //create a new todo from the value of our text input handle
            this.controller.newTodo(val);
            $handle.val('');
          }
        }
      });

    return NewTodoControl;
});