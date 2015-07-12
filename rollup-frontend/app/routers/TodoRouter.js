/**
 * Defines application routes and fires associated methods on its controller.
 * @module routers/TodoRouter
 */
define(['backbone', 'marionette'],
  function(Backbone, Marionette){

    var TodoRouter = Marionette.AppRouter.extend({
      appRoutes: {
        "":"home",
        "archive": "archive"
      }
    });

    return TodoRouter;
});