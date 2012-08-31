var COLORS = ["yellow", "red", "blue", "green"];
var ROTATIONS = [-10, -5, 0, 5, 10];

var WorkItem = Backbone.Model.extend({
  defaults:{
    name:"",
    color: "yellow",
    rotation: 0,
    analysis:0,
    design:0,
    code:0,
    test:0,
    release:0,
    remainingEffortInStage:0
  },

  initialize:function(args) {
    //Get a random size of this workItem 0, 1, 2
    var size = Math.floor(Math.random() * 3);
    
    if(!args["analysis"]) {
      this.set("analysis", Math.round(Math.random() + size) + 1);
    }
    if(!args["design"]){
      this.set("design", Math.round(Math.random() + size));
    }
    if(!args["code"]){
      this.set("code", Math.round(Math.random() + size) + 3);
    }
    if(!args["test"]){
      this.set("test", Math.round(Math.random() + size) + 2);
    }
    if(!args["release"]){
      this.set("release", Math.round(Math.random() + size));
    }

    this._assignRandomColor();
    this._assignRandomRotation();
  },

  _assignRandomColor: function() {
    var randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.set("color", randomColor);
  },

  _assignRandomRotation: function() {
    var randomRotation = ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)];
    this.set("rotation", randomRotation);
  },

  performWork: function() {
    this.set("remainingEffortInStage", this.get("remainingEffortInStage") - 1);
  }
});

var WorkItemView = Backbone.View.extend({
  tagName:"div",
  className:"work-item",

  render:function () {
    var template = _.template($("#work-item-template").html(), {workItem:this.model});
    this.$el.html(template);
    return this;
  }
});