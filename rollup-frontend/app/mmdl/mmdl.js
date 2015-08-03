/**
 * MMDL: Marionette Material Design Lite - A component library
 * See [Backbone.Marionette.Object]{@link http://marionettejs.com/docs/v2.4.2/marionette.object.html}.
 * @module MMDL
 * @extends Backbone.Marionette.Object
 */
define([
  'backbone',
  'marionette',
  'mmdl/viewFactories/MMDLLayoutFactory',
  'mmdl/viewFactories/MMDLButtonFactory',
  'mmdl/viewFactories/MMDLCardFactory',
  'mmdl/viewFactories/MMDLWordsFactory'
  ],

  function(
    Backbone,
    Marionette,
    MMDLLayoutFactory,
    MMDLButtonFactory,
    MMDLCardFactory,
    MMDLWordsFactory
    ) {

    MMDL = Backbone.Marionette.Object.extend({

      initialize: function(options) {
        
        this.layoutFactory = new MMDLLayoutFactory();
        this.buttonFactory = new MMDLButtonFactory();
        this.cardFactory   = new MMDLCardFactory();
        this.wordsFactory  = new MMDLWordsFactory();
      },

      getMMDLLayout: function(options) {

        return this.layoutFactory.buildLayout(options);
      },

      button: function(options) {

        return this.buttonFactory.buildButton(options);
      },

      card: function(options) {

        return this.cardFactory.buildCard(options);
      },

      words: function(options) {
        
        return this.wordsFactory.buildWords(options);
      }
    });

    return new MMDL();
});