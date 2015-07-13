  /**
   * The top-level layout view
   * @module views/MainView
   */
define(['backbone', 'marionette', 'helpers/Animator'],
  function(Backbone, Marionette, Animator){

    var _ANIMATIONS = {
      IN: 'FADE_IN_UP'
    };

    var MainView = Backbone.Marionette.LayoutView.extend({

        /**
         * The template used for this view
         * @type {String}
         */
        template: 'Main',

        /**
         * Regions hash containing selectors for region container elements
         * @type {Object}
         */
        regions: {
          newTodo: '.new-todo',
          todos: '.todos-list',
          completed: '.completed-list'
        },

        initialize: function() {
          Animator.animate(this.el, Animator.animation(_ANIMATIONS.IN));
        }

      });

    return MainView;
});