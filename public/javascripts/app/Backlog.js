var BacklogView = ReadyWorkProviderView.extend({
  id: "backlog",
  className: "span2",

  render: function() {
    var template = _.template($("#backlog-template").html(), {backlog:this.model});
    this.$el.html(template);
    return this;
  }
});