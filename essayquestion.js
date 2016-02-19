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
  
  // Inherit from H5P.question
  C.prototype = Object.create(H5P.Question.prototype);
  C.prototype.constructor = C;
  
  // Define intro, content, etc.
  C.prototype.registerDomElements = function () {
  	var self = this;
  	self.setIntroduction('<div class="essayquestion-text">' + this.options.questiontext + '</div>');
  	self.setContent('<div class="essayquestion-input-ro"></div><textarea class="essayquestion-input"></textarea>');
    self.registerButtons();
  }
  
  // Define submit button and process
  C.prototype.registerButtons = function () {
    var that = this;
    this.addButton(
    	'essayquestion-submit',
    	this.options.submitButton, 
    	function () {;
			that.response = $(".essayquestion-input").val();
			console.log("Submitting2 '" + that.response + "'");
			$(".essayquestion-input-ro").html(that.response);
			$(".essayquestion-input-ro").fadeIn();
			$(".essayquestion-input").fadeOut();
			that.triggerXAPI("answered", {
					questiontext: that.options.questiontext,
					answer: that.response
			});	
	    },
    	true
	);
  };
  
  
 
  return C;
})(H5P.jQuery);
