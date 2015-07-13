define([
  'backbone',
  'marionette'
  ],

  function(
    Backbone,
    Marionette
    ) {

    var SessionManager = Backbone.Marionette.Object.extend({

      initialize: function() {

        Parse.initialize("AQ2JzJBrqkne4KsZ3o4XYdG7bHlGPD9rWkepienY", "UxWpy5cEskMQ8uiBm5nFLAe9mbxqwYgFg9b8fV5w");
      },

      isLoggedIn: function() {

        return Parse.User.current() ? true : false;
      }
    });

    return SessionManager;
});