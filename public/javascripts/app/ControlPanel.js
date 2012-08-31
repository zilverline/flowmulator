var ControlPanel = Backbone.Model.extend({
  runTenDays: function() {
    this.trigger("runTenDays");
  },
  runOneDay: function() {
    this.trigger("runOneDay");
  }
});

var ControlPanelView = Backbone.View.extend({
  id: "control-panel",
  className: "row-fluid",

  events: {
    "click #run-ten-days": "runTenDays",
    "click #run-one-day": "runOneDay"
  },
  render: function() {
    var template = _.template($("#control-panel-template").html(), {});
    this.$el.html(template);
    return this;
  },
  runTenDays: function() {
    this.model.runTenDays();
  },
  runOneDay: function() {
    this.model.runOneDay();
  }
});