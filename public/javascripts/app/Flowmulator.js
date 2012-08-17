var Flowmulator = Backbone.Model.extend({
  defaults: {
    backlog: null,
    board: null,
    controlPanel: null
  },
  initialize: function() {
    var board = this.get("board");
    _.bindAll(board, "runOneDay");
    this.get("controlPanel").bind("runOneDay", board.runOneDay);
  }
});

var FlowmulatorView = Backbone.View.extend({
  render: function() {
    $("#container").append(new BacklogView({model: this.model.get("backlog")}).render().el);
    $("#container").append(new BoardView({model: this.model.get("board")}).render().el);
    $("#container").append(new ControlPanelView({model: this.model.get("controlPanel")}).render().el);
    return this;
  }
});
