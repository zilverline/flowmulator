var ControlPanel = Backbone.Model.extend({
  runOneDay: function() {
    this.trigger("runOneDay");
  }
});

var ControlPanelView = Backbone.View.extend({
  events: {
    "click #run-one-day": "runOneDay"
  },
  render: function() {
    var template = _.template($("#control-panel-template").html(), {});
    this.$el.html(template);
    return this;
  },
  runOneDay: function() {
    this.model.runOneDay();
  }
});