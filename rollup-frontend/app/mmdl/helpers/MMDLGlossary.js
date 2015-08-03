/**
 * MMDLGlossary is a list of terms
 * See [Backbone.Marionette.Object]{@link http://marionettejs.com/docs/v2.4.2/marionette.object.html}.
 * @module helpers/MMDLGlossary
 * @extends Backbone.Marionette.Object
 */
define([
  'underscore',
  'backbone',
  'marionette'
  ],

  function(
    _,
    Backbone,
    Marionette
    ) {

    var _components = {
      GRID: {
        tagName  : 'section',
        mdlClass : 'mdl-grid',
        template : 'mdlGrid'
      },

      BUTTON: {
        tagName : 'button',
        mdlClass: 'mdl-button mdl-js-button',
        template: 'mdlButton',
        options : {
                    ripple : 'mdl-js-ripple-effect',
                    colored: 'mdl-button--colored',
                    accent : 'mdl-button--accent',
                    primary: 'mdl-button--primary' 
                  }, 
        types   : {
                    FAB     : {
                                className: 'mdl-button--fab'
                              },
                    MINI_FAB: {
                                className: 'mdl-button--fab mdl-button--mini-fab'
                              },
                    RAISED  : {
                                className: 'mdl-button--raised'
                              },
                    FLAT    : {}
                  }
      },
      CARD: {
        tagName : 'div',
        template: 'mdlCard',
        mdlClass: 'mdl-card mdl-shadow--2dp',
        options : {}
      },
      WORDS: {
        template: 'mdlWords'
      }
    },

    MMDLGlossary = Backbone.Marionette.Object.extend({

      initialize: function(options) {

      },

      getComponentConfig: function(component) {

        return _.extend({}, _components[component]);
      }
    });

    return new MMDLGlossary();
});