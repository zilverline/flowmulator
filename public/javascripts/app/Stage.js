var Stage = Backbone.Model.extend({
  defaults:{
    name:"",
    velocity:0,
    backlog: null,
    workItems:[]
  },
  runOneDay:function () {
    this.set("velocity", this.determineVelocity());
    var workItems = this.get("workItems");
    if(_.size(workItems) == 0) {
      var next = this.get("backlog").shift();
      workItems.push(next);
    }
  },
  determineVelocity:function () {
    return Math.floor(Math.random() * 6) + 1;
  }
});

var StageView = Backbone.View.extend({
  tagName:"li",
  initialize:function () {
    _.bindAll(this, "render");
    this.model.bind("change:velocity", this.render);
  },
  render:function () {
    var template = _.template($("#stage-template").html(), {stage:this.model});
    this.$el.html(template);
    return this;
  }
});