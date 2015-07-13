define(['backbone', 'marionette'],
  function(Backbone, Marionette){

    /**
     * Constants used for animation logic
     * @inner
     * @type {Object}
     */
    var _CONSTANTS = {
      ANIMATED_CLASS: 'animated',
      ANIMATION_END_EVENT: 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
    };

    /**
     * Animation classes applied to elements to achieve animation effects
     * @inner
     * @type {Object}
     */
    var _ANIMATIONS = {
      //SLIDE
      SLIDE_IN_LEFT  : 'slideInLeft',
      SLIDE_OUT_LEFT : 'slideOutLeft',
      SLIDE_IN_RIGHT : 'slideInRight',
      SLIDE_OUT_RIGHT: 'slideOutRight',
      //BOUNCE
      BOUNCE_IN      : 'bounceIn',
      BOUNCE_OUT     : 'bounceOut',
      //FADE
      FADE_IN        : 'fadeIn',
      FADE_OUT       : 'fadeOut',
      FADE_IN_UP     : 'fadeInUp',
      //ZOOM
      ZOOM_IN        : 'zoomIn',
      ZOOM_OUT       : 'zoomOut',
      //FLIP
      FLIP_IN_Y      : 'flipInY'
    };

    /**
     * Animates views
     * @exports helpers/Animator
     */
    var Animator = {

      /**
       * Animates a dom element, calls optional provided callback on animation completion
       * @param  {object}               $el        reference to the DOM element to animate (jQuery or native DOM object)
       * @param  {string}               animation  name of the animation to apply
       * @param  {Function}             [callback] called on animation completion
       * @return {undefined}                       undefined
       */
      animate: function($el, animation, callback) {
        var animationClass = _CONSTANTS.ANIMATED_CLASS + ' ' + animation;

        //if we've received a reference to an element
        //that is not wrapped as a jQuery object
        if(!($el instanceof $)) {
          $el = $($el);
        }

        //add animation class
        $el.addClass(animationClass);

        //on animation finish
        $el.one(_CONSTANTS.ANIMATION_END_EVENT, function() {
          //remove animation class
          $el.removeClass(animationClass);
          if(callback && typeof callback === 'function') {
            //call callback
            callback($el);
          }
        });
      },

      /**
       * Accesses internal, private map of animation classes
       * @param  {string} animationName the animation name
       * @return {string}               the animation class
       */
      animation: function(animationName) {
        return _ANIMATIONS[animationName];
      }
    }

    return Animator;
});