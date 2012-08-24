var ControlPanel = Backbone.Model.extend({
  runOneDay: function() {
    this.trigger("runOneDay");
  },
  runOneDayReversed: function() {
    this.trigger("runOneDayReversed");
  }
});

var ControlPanelView = Backbone.View.extend({
  events: {
    "click #run-one-day": "runOneDay",
    "click #run-one-day-reversed": "runOneDayReversed"
  },
  render: function() {
    var template = _.template($("#control-panel-template").html(), {});
    this.$el.html(template);
    return this;
  },
  runOneDay: function() {
    this.model.runOneDay();
  },
  runOneDayReversed: function() {
    this.model.runOneDayReversed();
  }
});