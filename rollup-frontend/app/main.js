define([
    'requireConfig'
  ], 

  function () {

    require([
      'jquery',
      'backbone', 
      'marionette', 
      'helpers/DustFilters', 
      'routers/RollupRouter', 
      'controllers/RollupController',
      'dust',
      'templates'
    ],

    function (
      $,
      Backbone, 
      Marionette, 
      Filters, 
      RollupRouter, 
      RollupController
      ) {
      var app = new Marionette.Application();

      //Add initializer that will execute immediately
      //before app start
      app.addInitializer(function(){

        //Override Marionette's default render engine
        //and replace with mighty Dust!
        Backbone.Marionette.Renderer.render = function (template, data) {
          var html;
          
          dust.render(template, data, function (err, out) {
            html = out;
          });
          return html;
        };

        //Register our custom dust filters
        for(filter in Filters) {
          dust.filters[filter] = Filters[filter];
        }

        //Create application router
        app.router = new RollupRouter({controller: new RollupController()});

        //Start backbone history immediately after application start.
        //This step is important - the router wont work without it!
        app.on("start", function() {
          Backbone.history.start();
        });
      });

      //Start the application
      app.start();
  });
});