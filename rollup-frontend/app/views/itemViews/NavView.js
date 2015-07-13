define([
  'jquery',
  'backbone',
  'marionette',
  'helpers/Animator'
  ],

  function(
    $,
    Backbone,
    Marionette,
    Animator
    ) {

    var _ANIMATIONS = {
      IN: 'FADE_IN_DOWN'
    },

    NavView = Backbone.Marionette.ItemView.extend({
      initialize: function() {
      },
      template: 'Nav',
      onAttach: function() {
        Animator.animate($(this.el).find('header'), Animator.animation(_ANIMATIONS.IN), function() {
          componentHandler.upgradeDom();
        });
      }
    });   

    return NavView;
});