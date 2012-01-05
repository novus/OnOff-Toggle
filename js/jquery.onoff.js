(function($) {
  var cssClassPane = "nv-pane";

  var methods = {
    init: function(options) {

      var settings = $.extend({
        "bindClick": false,
        "useLabel": false,
        "onClickEvent": ""
      }, options);

      this.find("input[type=checkbox]").each(function() {
        /* Create the toggle control in the document. */
        var ckbox = this;
        var defaultLabels = ['on', 'off'];
        var labels = (function() {
          if(settings.useLabel) {
            var label = $("label[for='" + $(ckbox).attr("id") + "']").html();
            if (!!label) return [label, label]; else return defaultLabels;
          } else return defaultLabels;
        })();
        var onLabel = labels[0];
        var offLabel = labels[1];
        var classes = ($(ckbox).attr("class") + " nv-toggle").trim();
        var toggle = $(
          '<div class="' + classes + '">' +
            '<div class="nv-pane nv-on-state">' +
            '<div class="nv-on">' + onLabel + '</div>' +
            '<div class="nv-handle">&nbsp;</div>' +
            '<div class="nv-off">' + offLabel + '</div>' +
            '</div>' +
            '</div>');
        var pane = $(toggle.children("." + cssClassPane));
        $(this).before(toggle);
        /* Bind the state to the peer checkbox, respecting the default value. */
        if (! this.checked) pane.addClass("nv-off-state");
        $(ckbox).hide();
        pane.click(function(e) {
          if(!$(ckbox).is(":disabled")) {
            ckbox.checked = $(this).hasClass("nv-off-state");
            $(this).toggleClass("nv-off-state");
          }
          if (!!settings.onClickEvent) $(ckbox).trigger(settings.onClickEvent);
        });
        /* If requested, bind to the click event of the peer (enables label clicks). */
        if (settings.bindClick)
          $(ckbox).click(function() {
            pane.toggleClass("nv-off-state");
          });
      });
    }
  };

  $.fn.onOff =
    function(method) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || ! method) {
        return methods.init.apply(this, arguments);
      } else $.error("Method " + method + " does not exist!");
    };
})(jQuery);