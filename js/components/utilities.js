jQuery.fn.extend({
    ensureLoad: function(handler) {
        return this.each(function() {
            if(this.complete) {
                handler.call(this);
            } else {
                jQuery(this).load(handler);
            }
        });
    }
});

function setOpts (standard, user) {
  if (typeof user === 'object') {
    for (var key in user) {
      standard[key] = user[key];
    }
  }
  return standard;
}