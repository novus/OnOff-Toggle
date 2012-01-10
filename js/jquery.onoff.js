(function($) {

  /*
   * An ad-hoc action queue to defer actions on onoff toggles when necessary. One intended use-case is
   * using onOff("click", ...) to attach a click handler in code that executes before onoff toggles
   * have been initialized.
   */
  var actions = new (function() {
    var _actions = [];
    var _drained = false;
    this.queue = function(op) {
      if(_drained) op();
      else _actions.push(op);
    };
    this.execute = function() {
      _drained = true;
      _actions.forEach(function(op) { op(); });
    };
  });

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
        var id = this.id + "_onoff";

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
          '<div id="' + id + '" class="' + classes + '">' +
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

      /* Toggles are ready; run any actions. */
      actions.execute();
    },
    
    /** Bind a click event to the toggle and peer input control. */
    click: function(handler) {
      var selfId = $(this).attr("id");
      actions.queue(function() {
        var peerCkBox = document.getElementById(selfId);
        var peerOnOff = document.getElementById(selfId + "_onoff");
        $(peerCkBox).click(function(e) { return handler.call(this, e, peerCkBox, peerOnOff); })
        $(peerOnOff).click(function(e) { return handler.call(this, e, peerCkBox, peerOnOff); });
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