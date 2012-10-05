var BacklogView = ReadyWorkProviderView.extend({
  id: "backlog",
  className: "span2",

  render: function() {
    var template = _.template($("#backlog-template").html(), {backlog:this.model});
    this.$el.html(template);

    var allWorkColumn = this.$el.find(".backlog");
    _(this.model.get("readyWork")).each(function (workItem) {
      allWorkColumn.append(new WorkItemView({model:workItem}).render().el);
    });
    
    return this;
  }
});