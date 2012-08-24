var WorkItem = Backbone.Model.extend({
  defaults:{
    name:"",
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
  }
});

var WorkItemView = Backbone.View.extend({
  tagName:"li",
  className:"work-item",

  render:function () {
    var template = _.template($("#work-item-template").html(), {workItem:this.model});
    this.$el.html(template);
    return this;
  }
});