/**
 * Defines application routes and fires associated methods on its controller.
 * @module routers/RollupRouter
 */
define(['backbone', 'marionette'],
  function(Backbone, Marionette){

    var RollupRouter = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        ""      :"feed",
        "teams" : "teams",
        "report": "report",
        "login" : "login"
      }
    });

    return RollupRouter;
});