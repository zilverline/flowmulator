var WorkItem = Backbone.Model.extend({
  defaults: {
    name: ""
  }
});

var WorkItemView = Backbone.View.extend({
  tagName: "li",
  className: "work-item",

  render: function() {
    var template = _.template($("#work-item-template").html(), {workItem: this.model});
    this.$el.html(template);
    return this;
  }
});