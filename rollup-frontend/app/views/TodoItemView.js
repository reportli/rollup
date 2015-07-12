/**
 * @module views/TodoItemView
 */
define(['backbone', 'marionette', 'helpers/Animator'],
  function(Backbone, Marionette, Animator){

    var _ANIMATIONS =  {
      IN: 'SLIDE_IN_LEFT',
      OUT: 'SLIDE_OUT_LEFT'
    }

    var TodoItemView = Backbone.Marionette.ItemView.extend({
        tagName: 'li',
        template: 'TodoItem',
        ui: {
          finish: '.btn-finish',
          remove: '.btn-remove'
        },
        triggers: {
          'click @ui.finish': 'todo:finish'
        },

        /**
         * Initializes the TodoItemView, binds handlers to ui events
         * @return {undefined} undefined
         */
        initialize: function() {
          var $el = $(this.el);

          //If this view is representing a completed todo item
          if(this.model.get('isDone')) {
            //add the completed class
            $el.addClass('completed');
          }else{
            //If this view represents a newly created (not completed) todo item
            //bind an event handler to the model's custom 'finish' event
            this.listenTo(this, 'todo:finish', this.handleFinishClick);
          }

          Animator.animate($el, Animator.animation(_ANIMATIONS.IN));
        },

        /**
         * Handles a user's click on this ItemView's 'completed' button.
         * Completes the assigned model, applies animation, stops this view
         * from responding to any subsequent events.
         * @instance
         * @param  {object}    e event object
         * @return {undefined}   undefined
         */
        handleFinishClick: function(e) {
          var self = this,
              $el = $(this.el);

          //complete the todo model
          this.model.set({
                          isDone: true,
                          completed: new Date().getTime()
                        });

          //Apply exit animation
          Animator.animate($el, Animator.animation(_ANIMATIONS.OUT), function() {
            self.model.collection.remove(self.model);
          });

          //stop listening to UI events - this view is on its way out!
          this.stopListening();
        }
      });

    return TodoItemView;
});