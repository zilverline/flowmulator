var Board = Backbone.Model.extend({
  defaults: {
    stages: []
  },

  runOneDay: function() {
    _(this.get("stages")).forEach(function (stage) {
      stage.runStage();
    }); 
  }
});

var BoardView = Backbone.View.extend({
  id: "board",
  tagName: "ul",

  render: function() {
    var self = this;
    _(this.model.get("stages")).forEach(function (stage) {
      self.$el.append(new StageView({model: stage}).render().el);
    });
    return this;
  }
});