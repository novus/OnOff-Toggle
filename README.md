An "on/off" replacement toggle for html checkboxes, modeled after a familiar UI.

There are [other implementations](http://awardwinningfjords.com/2009/06/16/iphone-style-checkboxes.html)
available, but we prefer a lighter version without the need for images or (much) javascript.

Using the jQuery plugin, it's easy to replace checkboxes with on/off toggles:

    $("form").onOff();

The state of the peer control will be kept in sync, so form submissions will behave exactly
as the would have. You can also bind the click event of the peer to the toggle:

    $("form").onOff({ bindClick: true });

This will preserve clickability on label elements bound to the checkbox control.

It is sometimes desirable to attach the same click behavior to both the peer control and the
synthetic toggle:

    $("#some_checkbox").onfOff("click", function(e, ckbox, onoff) {
      console.log(ckbox.checked);
    })