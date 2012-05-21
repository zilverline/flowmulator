var Backlog = Backbone.Collection.extend({
  model: WorkItem
});

var BacklogView = Backbone.View.extend({
  id: "backlog",
  tagName: "ul",
  initialize: function() {
    _.bindAll(this, "addWorkItem");
//    this.collection.bind("remove", this.render);
  },

  render: function() {
    this.$el.empty();
    var self = this;
    this.collection.forEach(function(workItem) {
      self.$el.append(new WorkItemView({model: workItem}).render().el);
    });
    return this;
    //this.collection.each(this.addWorkItem);
  },
  addWorkItem: function(workItem) {
    this.$el.append(new WorkItemView({model:workItem}).render().el);
  }
});