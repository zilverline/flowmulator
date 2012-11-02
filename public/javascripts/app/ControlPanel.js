var ControlPanel = Backbone.Model.extend({

  runHunderdDays:function(){
    this.trigger("runHunderdDays");
  },
  runTenDays: function() {
    this.trigger("runTenDays");
  },
  runOneDay: function() {
    this.trigger("runOneDay");
  },
  resetBoard: function() {
    var workItems = _.map(window.workItems, function(workItem) {
      workItem.reset();
      return workItem;
    });
    window.startup(workItems);
  }
});

var ControlPanelView = Backbone.View.extend({
  id: "control-panel",
  className: "row-fluid",

  events: {
    "click #run-hunderd-days": "runHunderdDays",
    "click #run-ten-days": "runTenDays",
    "click #run-one-day": "runOneDay",
    "click #restart": "resetBoard"
  },
  render: function() {
    var template = _.template($("#control-panel-template").html(), {});
    this.$el.html(template);
    return this;
  },
  runHunderdDays:function(){
    this.model.runHunderdDays();
  },
  runTenDays: function() {
    this.model.runTenDays();
  },
  runOneDay: function() {
    this.model.runOneDay();
  },
  resetBoard: function() {
    this.model.resetBoard();
  }
});