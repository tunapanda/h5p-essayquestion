var H5P = H5P || {};
 
H5P.EssayQuestion = (function ($) {
  /**
   * Initialize module.
   *
   * @class
   * @extend H5P.Question
   * @param {Object} options Run parameters
   * @param {Number} id Content identification
   */
  function C(options, id) {
    var self = this;
  	H5P.Question.call(self, 'essayquestion');
    // Extend defaults with provided options
    this.options = $.extend(true, {}, {
      questiontext: '',
      submitButton: "Submit Answer"
    }, options);
    // Keep provided id.
    this.id = id;
    this.response = undefined;
  };
  
  C.prototype = Object.create(H5P.Question.prototype);
  C.prototype.constructor = C;
  C.prototype.registerDomElements = function () {
  	var self = this;
  	self.setIntroduction('<div class="essayquestion-text">' + this.options.questiontext + '</div>');
  	self.setContent('<textarea class="essayquestion-input"></textarea>');
  	console.log("SETUP");
    self.registerButtons();
  }
  
  C.prototype.registerButtons = function () {
    // Add show score button
    console.log("BUTTONS");
    this.addSubmitButton();
  };
  
  C.prototype.addSubmitButton = function () {
    var that = this;

    this.addButton('submit-answer', this.options.submitButton, function () {
    	console.log("submitted");
    	that.response = $(".essayquestion-input").val();
    	console.log("JQ = " + $(".essayquestion-input").val());
    	console.log("SELF = " + that.response);
    	that.triggerXAPI("http://adlnet.gov/expapi/verbs/answered",{
    		questiontext: that.options.questiontext,
    		answer: that.response
    	});
    });
  };
 
  
  
  /**
   * Attach function called by H5P framework to insert H5P content into
   * page
   *
   * @param {jQuery} $container
   */
  C.prototype.attach = function ($container) {
    // Set class on container to identify it as a greeting card
    // container.  Allows for styling later.
    $container.addClass("h5p-essayquestion");
    // Add image if provided.
    /*if (this.options.image && this.options.image.path) {
      $container.append('<img class="greeting-image" src="' + H5P.getPath(this.options.image.path, this.id) + '">');
    }*/
    // Add question text.
    $container.append('<div class="essayquestion-text">ATTACH' + this.options.questiontext + '</div>');
  };
 
  return C;
})(H5P.jQuery);
