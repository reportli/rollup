/**
 * MMDLButton description
 * See [Backbone.Marionette.ItemView]{@link http://marionettejs.com/docs/v2.4.2/marionette.itemview.html}.
 * @module views/itemViews/MMDLButton
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

    MMDLButton = Backbone.Marionette.ItemView.extend({
      
      tagName: 'button',

      template: function() {
        
        return options = this.getOption('options').template;
      },

      className: function() {

        var classes = [],
            options = this.getOption('options');

        classes.push(this.getOption('mdlClass'));
        classes.push(this.getOption('types')[this.getOption('type')].className);

        if(this.getOption('ripple')) {
        
          classes.push(options.ripple);
        }

        switch (this.getOption('colored')) {

          case 'colored':
            classes.push(options.colored);
          break;

          case 'accent':
            classes.push(options.accent);
          break;

          case 'primary':
            classes.push(options.primary);
          break;
        }

        return classes.join(' ');
      },

      templateHelpers: function() {

        return {
          icon: this.getOption('icon'),
          text: this.getOption('text')
        }
      },

      onRender: function() {

        if(this.getOption('disabled') === true) {

          this.$el.attr('disabled', '');
        }
      },

      onAttach: function() {

        componentHandler.upgradeDom();
      }
    });
 
    return MMDLButton;
});