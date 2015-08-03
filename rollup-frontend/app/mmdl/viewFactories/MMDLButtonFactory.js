/**
 * MMDLButtonFactory description
 * See [Backbone.Marionette.Object]{@link http://marionettejs.com/docs/v2.4.2/marionette.object.html}.
 * @module controllers/MMDLButtonFactory
 * @extends Backbone.Marionette.Object
 */
define([
  'backbone',
  'marionette',
  'mmdl/helpers/MMDLGlossary',
  'mmdl/views/MMDLButton'

  ],

  function(
    Backbone,
    Marionette,
    MMDLGlossary,
    MMDLButton
    ) {

    MMDLButtonFactory = Backbone.Marionette.Object.extend({

      buildButton: function(options) {

        var mdlConfig = MMDLGlossary.getComponentConfig('BUTTON'),
            config = _.extend(options, mdlConfig);

        return new MMDLButton(config);
      }
    });

    return MMDLButtonFactory;
});