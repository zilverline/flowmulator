var Board = Backbone.Model.extend({
  defaults:{
    backlog:null,
    stages:[]
  },

  runTenDays:function () {
    var self = this;
    _(10).times(function () {
      self.runOneDay();
    });
  },

  runOneDay:function () {
    var reversedStages = this.get("stages").slice().reverse();
    _(reversedStages).forEach(function (stage) {
      stage.runStage();
    });

  }
});

var BoardView = Backbone.View.extend({
  id:"board",
  tagName:"div",
  className:"row-fluid",

  render:function () {
    this.$el.append(new BacklogView({model:this.model.get("backlog")}).render().el);

    var self = this;
    _(this.model.get("stages")).forEach(function (stage) {
      self.$el.append(new StageView({model:stage}).render().el);
    });
    return this;
  }
});