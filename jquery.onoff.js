(function($) {
  var cssClassPane = "nv-pane";
  
  var methods = {
    replaceCheckboxes: function() {
      this.find("input[type=checkbox]").each(function() {
        var toggle = $('<div class="nv-toggle"><div class="nv-pane nv-on-state"><div class="nv-on">on</div><div class="nv-handle">&nbsp;</div><div class="nv-off">off</div></div></div>');
        var pane = $(toggle.children("." + cssClassPane));
        $(this).before(toggle);
        if(! this.checked) pane.addClass("nv-off-state");
        var ckbox = this;
        $(ckbox).hide();
        pane.click(function(e) {
          ckbox.checked = $(this).hasClass("nv-off-state");
          $(this).toggleClass("nv-off-state");
        });
        $(ckbox).click(function() {
          pane.toggleClass("nv-off-state");
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