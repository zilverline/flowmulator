var Flowmulator = Backbone.Model.extend({
  defaults: {
    board: null,
    controlPanel: null
  },

  initialize: function() {
    var board = this.get("board");
    _.bindAll(board, "runTenDays", "runOneDay");
    this.get("controlPanel").bind("runTenDays", board.runTenDays);
    this.get("controlPanel").bind("runOneDay", board.runOneDay);
  }
});

var FlowmulatorView = Backbone.View.extend({
  render: function() {
    $("#container").empty();
    $("#container").append(new ControlPanelView({model: this.model.get("controlPanel")}).render().el);
    $("#container").append(new BoardView({model: this.model.get("board")}).render().el);
    return this;
  }
});
