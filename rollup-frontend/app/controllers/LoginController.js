define([
  'underscore',
  'backbone',
  'marionette'
  ],

  function(
    _,
    Backbone,
    Marionette
    ) {

    var LoginController = Backbone.Marionette.Object.extend({

      initialize: function(options) {

        this.parentView = options.parentView;

        this.viewClass = Backbone.Marionette.LayoutView.extend({

          mergedOptions: ['childViews'],

          initialize: function(options) {

            this.mergeOptions(options, this.mergedOptions);
          },


          onBeforeShow: function() {

            var self = this,
                children = this.getOption('childViews');
                  console.log(children);
            if(Array.isArray(children)) {
              children.forEach(function(childView) {
                console.log(childView);
                self.showChildView(childView.getOption('region'), childView)
              });
            }
          },

          templateHelpers: function() {
            
            var self = this;
                regions = this.getOption('regions'),
                regionConfig = this.getOption('regionConfig'),
                configgedRegions = [];

            for(var region in regions) {
              var rConfig = regionConfig[region];
              var config = _.extend({ region: region }, regionConfig[region]);
              configgedRegions.push(config);
            };

            return {
              regions: configgedRegions
            };

          }
        });

        this.view = new this.viewClass({
          tagName: 'section',
          className: 'mdl-grid',
          template: 'LoginView',
          regions: {
            loginContent: '[data-region=loginContent]',
            mainContent: '[data-region=mainContent]' 
          },
          regionConfig: {
            loginContent: {
              tagName: 'article',
              className: 'loginContent'
            },
            mainContent: {
              tagName: 'section',
              className: 'mainContent'
            }
          },
          childViews: [
                        new this.viewClass({
                          tagName: 'section',          
                          region: 'loginContent',
                          template: 'LoginView',
                          regions: {
                            header: '[data-region=header]',
                            footer: '[data-region=footer]'
                          },
                          regionConfig: {
                            header: {
                              tagName: 'header',
                            },
                            footer: {
                              tagName: 'footer',
                              className: 'awesome'
                            }
                          }
                        }),
                       new this.viewClass({
                          tagName: 'div',          
                          region: 'mainContent',
                          template: 'LoginView',
                          regions: {
                            profile: '[data-region=profile]',
                            info: '[data-region=info]'
                          },
                          regionConfig: {
                            profile: {
                              tagName: 'section',
                              className: 'profile'
                            },
                            info: {
                              tagName: 'div',
                              className: 'user-info'
                            }
                          }
                        }),
                      ]
        });

        this.parentView.getRegion('content').show(this.view);
        componentHandler.upgradeDom();
      }
    });

    return LoginController;
});