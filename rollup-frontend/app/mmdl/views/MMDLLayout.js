/**
 * MMDLLayout description
 * See [Backbone.Marionette.LayoutView]{@link http://marionettejs.com/docs/v2.4.2/marionette.layoutview.html}.
 * @module views/layoutViews/MMDLLayout
 * @extends Backbone.Marionette.LayoutView
 */
define([
  'backbone',
  'marionette'
  ],

  function(
    Backbone,
    Marionette
    ) {

    var MMDLLayout = Backbone.Marionette.LayoutView.extend({

          mergedOptions: ['childViews', 'region'],

          initialize: function(options) {
           
            //this is the right syntax for copying properties
            //from constructor options object properties to instance properties
            this.mergeOptions(options, this.mergedOptions);
          },

          onBeforeShow: function() {

            var self = this,
                children = this.getOption('childViews');
                
            if(Array.isArray(children)) {

              children.forEach(function(childView) {

                self.showChildView(childView.getOption('region'), childView)
              });
            }
          },

          templateHelpers: function() {
              
            var self = this;
                //this.getOption is the right way to access properties
                //ensuring that options override instance/default properties
                regions = this.getOption('regions'),
                regionConfig = this.getOption('regionConfig'),
                configgedRegions = [];

            for(var region in regions) {

              var rConfig = regionConfig[region],
                  config = _.extend({ region: region }, regionConfig[region]);

              configgedRegions.push(config);
            };

            return {
              regions: configgedRegions
            };
          }
        });

    return MMDLLayout;
});