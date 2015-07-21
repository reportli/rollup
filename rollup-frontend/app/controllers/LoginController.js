define([
  'underscore',
  'backbone',
  'marionette',
  'mmdl/mmdl',
  'mmdl/views/MMDLLayout'
  ],

  function(
    _,
    Backbone,
    Marionette,
    MMDL,
    MMDLLayout
    ) {

    var LoginController = Backbone.Marionette.Object.extend({

      initialize: function(options) {

        this.parentView = options.parentView;

        this.view = MMDL.getMMDLLayout({
          regions: {
            loginContent: {
              columns: 6,
              className: 'content login'
            },
            mainContent: {
              columns: 6,
              className: 'content main'
            }
           },
          childViews: [
            MMDL.getMMDLLayout({
              region: 'mainContent',
              regions: {
                username: {
                  columns: 8,
                  className: 'content login'
                },
                password: {
                  columns: 2,
                  className: 'content main'
                }
              },
              childViews: [
                  MMDL.getMMDLLayout({
                    region: 'username',
                    regions: {
                      username: {
                        columns: 4,
                        className: 'content login'
                      },
                      password: {
                        columns: 3,
                        className: 'content main'
                      },
                      address: {
                        columns: 3,
                        className: 'content main'
                      }
                    },
                    childViews: [
                      new Backbone.Marionette.ItemView({
                        region: 'address',
                        template: 'Nav'
                      })
                    ]
                  })
                ]
            })
          ]   
        });

        this.parentView.getRegion('content').show(this.view);
      }
    });

    return LoginController;
});