var WorkItem = Backbone.Model.extend({
  defaults: {
    name: "",
    analysis: 0,
    design: 0,
    code: 0,
    test: 0,
    release: 0
  }
});

var WorkItemView = Backbone.View.extend({
  tagName: "li",

  render: function() {
    var template = _.template($("#work-item-template").html(), {workItem: this.model});
    this.$el.html(template);
    return this;
  }
});