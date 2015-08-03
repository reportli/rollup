define([
  'underscore',
  'backbone',
  'marionette',
  'mmdl/mmdl',
  'mmdl/views/MMDLLayout',
  'mmdl/views/MMDLButton'
  ],

  function(
    _,
    Backbone,
    Marionette,
    MMDL,
    MMDLLayout,
    MMDLButton
    ) {

    var LoginController = Backbone.Marionette.Object.extend({

      initialize: function(options) {

        this.parentView = options.parentView;

        this.view = MMDL.getMMDLLayout({
          regions: {
            loginContent: {
              columns  : 6,
              className: 'content login'
            },
            mainContent: {
              columns  : 6,
              className: 'content main'
            }
           },
          childViews: [
            MMDL.getMMDLLayout({
              region: 'mainContent',
              regions: {
                username: {
                  columns  : 8,
                  className: 'content login'
                },
                password: {
                  columns  : 2,
                  className: 'content main'
                }
              },
              childViews: [
                  MMDL.getMMDLLayout({
                    region: 'username',
                    regions: {
                      username: {
                        columns  : 4,
                        className: 'content login'
                      },
                      password: {
                        columns  : 3,
                        className: 'content main'
                      },
                      address: {
                        columns  : 3,
                        className: 'content main'
                      }
                    },
                    childViews: [
                      MMDL.button({
                        region  : 'address',
                        icon    : 'add',
                        ripple  : true,
                        type    : 'FAB',
                        colored : 'colored'
                      }),
                      MMDL.card({
                        region        : 'username',
                        name          : 'welcome',
                        title         : MMDL.words({
                                          tagName: 'div',
                                          words  : 'Hello San Francisco!'
                                        }),
                        supportingText: MMDL.words({
                                          tagName: 'div',
                                          words  : 'Yolo swag 247'
                                        }),
                        cardActions   : MMDL.getMMDLLayout({
                                          regions: {
                                            getStarted: {
                                              columns: 6,
                                              className: 'get-started'
                                            },
                                            signUp: {
                                              columns: 4,
                                              className: 'sign-up'
                                            }
                                          },
                                          childViews: [
                                            MMDL.button({
                                              region : 'getStarted',
                                              text   : 'account_balance',
                                              type   : 'RAISED',
                                              colored: 'primary',
                                              ripple : true
                                            }),
                                            MMDL.button({
                                              region : 'signUp',
                                              icon   : 'account_balance',
                                              type   : 'RAISED',
                                              colored: 'primary',
                                              ripple : true
                                            })
                                          ]
                                        })
                      }),
                      MMDL.button({
                        region  : 'password',
                        text    : 'SUBMIT',
                        ripple  : true,
                        type    : 'RAISED',
                        colored : 'accent'
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