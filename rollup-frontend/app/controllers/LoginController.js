define([
  'backbone',
  'marionette'
  ],

  function(
    Backbone,
    Marionette
    ) {

    var LoginController = Backbone.Marionette.Object.extend({

      initialize: function(options) {

        this.parentView = options.parentView;

        this.view = new Backbone.Marionette.ItemView({
          template: 'LoginView'
        });

        this.parentView.getRegion('content').show(this.view);
        componentHandler.upgradeDom();
      }
    });

    return LoginController;
});