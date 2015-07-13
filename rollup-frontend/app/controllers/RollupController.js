define([
  'underscore',
  'backbone',
  'marionette',
  'helpers/SessionManager',
  'views/MainView',
  'views/itemViews/NavView',
  'controllers/LoginController'
  ],

  function(
    _,
    Backbone,
    Marionette,
    SessionManager,
    MainView,
    NavView,
    LoginController
    ){

    var activePageController;

    /**
     * The "Super Controller" - responds to routes and manages sub-controllers
     * @exports controllers/RollupController
     */
    var RollupController = Marionette.Object.extend({
      
      initialize: function(options) {

        this.sessionManager = new SessionManager();

        this.view = new MainView({ el: "#app" });
        this.view.render();
      },

      showNavigation: function () {
        
        var navRegion = this.view.getRegion('nav');

        if(_.isUndefined(navRegion.currentView)) {

          this.view.getRegion('nav').show(new NavView());
        }
      },

      hideNavigation: function() {

        this.view.getRegion('nav').empty();
      },

      login: function() {

        this.hideNavigation();
        this.setActivePageController(LoginController, {
          parentView: this.view
        });
      },

      /**
       * Handles the "home" route, setting up the appropriate views and collections
       * @return {undefined} [undefined]
       */
      feed: function() {

        this.showNavigation();
      },

      /**
       * Handles the "archive" route
       * @return {undefined} undefined
       */
      teams: function() {

        this.showNavigation();
      },

      report: function() {

        this.showNavigation();
      },

      /**
       * Sets the active page controller by creating a new controller
       * or resetting the current controller
       * @param {object} ControllerClass The controller class to instantiate
       * @param {object} options         options to be passed to ControllerClass constructor
       */
      setActivePageController: function (ControllerClass, options) {
        options = options || {};

        if(!this.sessionManager.isLoggedIn()) {
          console.log('not logged in');
        }

        //If the active page controller is an instance of
        //the ControllerClass we're trying to instantiate
        //simply reset it instead of creating a new instance
        if (activePageController instanceof ControllerClass) {
          if (options.reset && _.isFunction(activePageController.reset)) {
            activePageController.reset();
          }
          return;
        }

        if (activePageController) {
          activePageController.destroy();
        }

        activePageController = new ControllerClass(options);
      }
    });

    return RollupController;
});
