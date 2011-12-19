(function($) {
  $.fn.replaceCheckboxes = function() {
    this.find("input[type=checkbox]").each(function() {
      var toggle = $('<div class="onoff"><div class="toggle_pane on_state"><div class="on">on</div><div class="handle">&nbsp;</div><div class="off">of\
f</div></div></div>');
      var pane = $(toggle.children(".toggle_pane"));
      $(this).parent().append(toggle);
      if(! this.checked)
        pane.addClass("off_state");
      var ckbox = this;
      $(ckbox).hide();
      pane.click(function(e) {
        ckbox.checked = $(this).hasClass("off_state");
        $(this).toggleClass("off_state");
      });
    });
  };
})(jQuery);