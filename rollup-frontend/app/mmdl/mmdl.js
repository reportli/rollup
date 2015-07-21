/**
 * MMDL: Marionette Material Design Lite - A component library
 * See [Backbone.Marionette.Object]{@link http://marionettejs.com/docs/v2.4.2/marionette.object.html}.
 * @module MMDL
 * @extends Backbone.Marionette.Object
 */
define([
  'backbone',
  'marionette',
  'mmdl/viewFactories/MMDLLayoutFactory'
  ],

  function(
    Backbone,
    Marionette,
    MMDLLayoutFactory
    ) {

    MMDL = Backbone.Marionette.Object.extend({

      initialize: function(options) {
        
        this.layoutFactory = new MMDLLayoutFactory();
      },

      getMMDLLayout: function(options) {

        return this.layoutFactory.buildLayout(options);
      }
    });

    return new MMDL();
});