var ReadyWorkProvider = Backbone.Model.extend({
  initialize:function () {
    if (!this.get("readyWork")) {
      this.set("readyWork", new Array());
    }
  },

  getNextReadyWork:function () {
    var readyWork = this.get("readyWork").shift();
    this.trigger("change:readyWork");
    return readyWork;
  },

  hasMoreReadyWork:function () {
    return this.get("readyWork").length > 0;
  }

});

var ReadyWorkProviderView = Backbone.View.extend({
  tagName:"div",

  initialize:function () {
    _.bindAll(this, "render");
    this.model.bind("change:readyWork", this.render);
  }
});