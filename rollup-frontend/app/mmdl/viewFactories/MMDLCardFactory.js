/**
 * MMDLCardFactory description
 * See [Backbone.Marionette.Object]{@link http://marionettejs.com/docs/v2.4.2/marionette.object.html}.
 * @module controllers/MMDLCardFactory
 * @extends Backbone.Marionette.Object
 */
define([
  'backbone',
  'marionette',
  'mmdl/helpers/MMDLGlossary',
  'mmdl/views/MMDLCard'
  ],

  function(
    Backbone,
    Marionette,
    MMDLGlossary,
    MMDLCard
    ) {

    var MMDLCardFactory = Backbone.Marionette.Object.extend({

      buildCard: function(options) {
        var mdlConfig = MMDLGlossary.getComponentConfig('CARD'),
            config = _.extend(options, mdlConfig);

        return new MMDLCard(config);
      }
    });

    return MMDLCardFactory;
});