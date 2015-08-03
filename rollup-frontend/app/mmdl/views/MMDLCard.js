/**
 * MMDLCard description
 * See [Backbone.Marionette.ItemView]{@link http://marionettejs.com/docs/v2.4.2/marionette.itemview.html}.
 * @module views/itemViews/MMDLCard
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
 
    var MMDLCard = Backbone.Marionette.LayoutView.extend({
      
      tagName: 'div',

      regions: {
        title         : '.mdl-card__title-text',
        supportingText: '.mdl-card__supporting-text',
        cardActions   : '.mdl-card__actions',
        cardMenu      : '.mdl-card_actions'
      },

      onBeforeShow: function() {

        this.showChildView('title', this.getOption('title'));
        this.showChildView('supportingText', this.getOption('supportingText'));
        this.showChildView('cardActions', this.getOption('cardActions'));
      },  

      className: function(){
        
        var classes = [],
            options = this.getOption('options');
        
        classes.push(this.getOption('mdlClass'));
        classes.push(this.getOption('name'));

        return classes.join(' ');
      },

      template: function() {

        return this.getOption('options').template;
      },

      templateHelpers: function() {

        return {
          titleText     : this.getOption('titleText'),
          supportingText: this.getOption('supportingText'),
          buttons       : this.getOption('buttons')
        }
      }
    });
 
    return MMDLCard;
});