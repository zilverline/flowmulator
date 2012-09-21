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
    remainingEffortInStage:0,
    remainingTotalEffort:0,
    workTime:0, //Time this item spends being worked upon.
    waitTime:0 //Time this item spends waiting to be worked upon.
  },

  initialize:function(args) {
    //Get a random size of this workItem 0, 1, 2
    var size = Math.floor(Math.random() * 3);
    var totalSize = 0;
    
    if(!args["analysis"]) {
      var analysisSize = Math.round(Math.random() + size) + 1;
      this.set("analysis", analysisSize);
      totalSize = totalSize + analysisSize;
    }
    if(!args["design"]){
      var designSize = Math.round(Math.random() + size);
      this.set("design", designSize);
      totalSize = totalSize + designSize;
    }
    if(!args["code"]){
      var codeSize = Math.round(Math.random() + size) + 3;
      this.set("code", codeSize);
      totalSize = totalSize + codeSize;
    }
    if(!args["test"]){
      var testSize = Math.round(Math.random() + size) + 2;
      this.set("test", testSize);
      totalSize = totalSize + testSize;
    }
    if(!args["release"]){
      var releaseSize = Math.round(Math.random() + size);
      this.set("release", releaseSize);
      totalSize = totalSize + releaseSize;
    }

    this._assignRandomColor();
    this._assignRandomRotation();
    //Determine total work effort for this item
    this.set("remainingTotalEffort",totalSize);

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
    this.set("remainingTotalEffort", this.get("remainingTotalEffort") - 1);
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