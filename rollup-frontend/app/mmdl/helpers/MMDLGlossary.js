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
        className: 'mdl-grid',
        template : 'mdlGrid'
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