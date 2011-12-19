(function($) {
  var cssClassPane = "toggle_pane";
  
  var methods = {
    replaceCheckboxes: function() {
      this.find("input[type=checkbox]").each(function() {
        var toggle = $('<div class="onoff"><div class="toggle_pane on_state"><div class="on">on</div><div class="handle">&nbsp;</div><div class="off">off</div></div></div>');
        var pane = $(toggle.children("." + cssClassPane));
        $(this).before(toggle);
        if(! this.checked) pane.addClass("off_state");
        var ckbox = this;
        $(ckbox).hide();
        pane.click(function(e) {
          ckbox.checked = $(this).hasClass("off_state");
          $(this).toggleClass("off_state");
        });
        $(ckbox).click(function() {
          pane.toggleClass("off_state");
	});
      });
    }
  };

  $.fn.onOff =
    function(method) {
      if(methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      }
    };
})(jQuery);