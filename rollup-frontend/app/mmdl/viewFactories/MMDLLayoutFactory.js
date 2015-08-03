/**
 * MMDLLayoutFactory description
 * See [Backbone.Marionette.Object]{@link http://marionettejs.com/docs/v2.4.2/marionette.object.html}.
 * @module MMDL/viewFactories/MMDLLayoutFactory
 * @extends Backbone.Marionette.Object
 */
define([
  'underscore',
  'backbone',
  'marionette',
  'mmdl/helpers/MMDLGlossary',
  'mmdl/views/MMDLLayout'
  ],

  function(
    _,
    Backbone,
    Marionette,
    MMDLGlossary,
    MMDLLayout
    ) {

    var MMDLLayoutFactory = Backbone.Marionette.Object.extend({

      buildRegionSelector: function(regionName) {

        return '[data-region=' + regionName + ']';
      },

      buildLayoutClass: function(className, columns) {

        return className + ' mdl-cell mdl-cell--' + columns + '-col';
      },

      buildRegionConfigs: function(regions) {

        var self = this,
            regionConfigs = _.extend({}, regions);

        for(var region in regions) {

          regionConfigs[region].className = self.buildLayoutClass(regionConfigs[region].className, regionConfigs[region].columns);
          regionConfigs[region].tagName = MMDLGlossary.getComponentConfig('GRID').tagName;

        }

        return regionConfigs;
      },

      buildRegions: function(options) {
        
        var self = this,
            regions = {};

        for(var property in options) {

          regions[property] = self.buildRegionSelector(property);
        }

        return regions;
      },

      buildLayout: function(options) {

        var mdlConfig = MMDLGlossary.getComponentConfig('GRID'),
            config = _.extend({
              region      : options.region,
              regions     : this.buildRegions(options.regions),
              regionConfig: this.buildRegionConfigs(options.regions),
              childViews  : options.childViews 
            }, mdlConfig);
        
        return new MMDLLayout(config);
      }
    });

    return MMDLLayoutFactory;
});