var ReadyWorkSource = Backbone.Model.extend({
  initialize: function() {
    if(!this.get("readyWork")) {
      this.set("readyWork", new Array());
    }
  },

  getReadyWork: function() {
    var readyWork = this.get("readyWork").shift();
    this.trigger("change:readyWork");
    return readyWork;
  }
});

var ReadyWorkSourceView = Backbone.View.extend({
  tagName: "ul",

  initialize: function() {
    _.bindAll(this, "render");
    this.model.bind("change:readyWork", this.render);
  },

  render: function() {
    this.$el.empty();
    var self = this;
    _(this.model.get("readyWork")).each(function(workItem) {
      self.$el.append(new WorkItemView({model: workItem}).render().el);
    });
    return this;
  }
});