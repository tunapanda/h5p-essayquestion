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
  	self.setContent('<textarea class="essayquestion-input"></textarea>');
    self.registerButtons();
  }
  
  // Make input read-only, submit via xAPI
  C.prototype.response_submitted = function() {
	// Replace input with read-only text
	var input = $(".essayquestion-input");
	this.response = input.val();
	var ro = $("<div>");
	ro.addClass(".essayquestion-input-ro");
	ro.html(this.response);
	input.replaceWith(ro);
	
	// submit xAPI 'answered' statement
	var xAPIEvent = this.createXAPIEventTemplate('answered');
	if (xAPIEvent.data.statement.result === undefined) {
		xAPIEvent.data.statement.result = {};
	}
	xAPIEvent.data.statement.result.response = this.response;
	xAPIEvent.data.statement.result.completion = true;
	this.trigger(xAPIEvent);
  }
  
  // Define submit button and process
  C.prototype.registerButtons = function () {
    var self = this;
    this.addButton(
    	'essayquestion-submit',
    	this.options.submitButton, 
  		function(){self.response_submitted()},
    	true
	);
  };
 
  return C;
})(H5P.jQuery);
