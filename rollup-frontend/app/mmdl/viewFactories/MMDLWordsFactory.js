/**
 * MMDLWordsFactory description
 * See [Backbone.Marionette.Object]{@link http://marionettejs.com/docs/v2.4.2/marionette.object.html}.
 * @module controllers/MMDLWordsFactory
 * @extends Backbone.Marionette.Object
 */
define([
  'backbone',
  'marionette',
  'mmdl/helpers/MMDLGlossary',
  'mmdl/views/MMDLWords'
  ],

  function(
    Backbone,
    Marionette,
    MMDLGlossary,
    MMDLWords
    ) {

    var MMDLWordsFactory = Backbone.Marionette.Object.extend({

      buildWords: function(options) {
        var mdlConfig = MMDLGlossary.getComponentConfig('WORDS'),
            config = _.extend(options, mdlConfig);

        return new MMDLWords(config);
      }
    });

    return MMDLWordsFactory;
});