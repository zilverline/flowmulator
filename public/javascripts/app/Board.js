var Board = Backbone.Model.extend({
  defaults: {
    stages: []
  },

  runOneDay: function() {
    _(this.get("stages")).forEach(function (stage) {
      stage.runStage(); 
    });

  },

  runOneDayReversed: function() {
    var once = true;
    var reversedStages = this.get("stages");
    if(once){
      console.log("Reversed!");
      reversedStages.reverse()
      once = false;
    }

    _(reversedStages).forEach(function (stage) {
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