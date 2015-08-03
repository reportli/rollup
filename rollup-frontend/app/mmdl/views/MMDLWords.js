/**
 * MMDLWords description
 * See [Backbone.Marionette.ItemView]{@link http://marionettejs.com/docs/v2.4.2/marionette.itemview.html}.
 * @module views/itemViews/MMDLWords
 * @extends Backbone.Marionette.ItemView
 */
define([
  'backbone',
  'marionette',
  'mmdl/helpers/MMDLGlossary'
  ],
 
  function(
    Backbone,
    Marionette,
    MMDLGlossary
    ) {
 
    var MMDLWords = Backbone.Marionette.ItemView.extend({
      
      tagName: function() {

        return this.getOption('tagName');
      },

      template: function() {

        return this.getOption('template');
      },

      templateHelpers: function() {

        return {
          words: this.getOption('words')
        }
      }
    });
 
    return MMDLWords;
});