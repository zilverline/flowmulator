var Stage = Backbone.Model.extend({
  defaults:{
    name:"",
    velocity:0,
    nextStage: null,
    previousStage: null,
    workItems:[]
  },
  runOneDay:function () {
    this.set("velocity", this.determineVelocity());
    var workItems = this.get("workItems");
    console.log(this.get("name"), this.get("previousStage"), this.get("nextStage"), workItems);
    
    if(workItems.length == 0){
      console.log("Geen werk! Aan de slag!!");

      if(this.get("name") == "Analysis"){
        
        this.getWork(this.get("velocity"));
      
        console.log(workItems);
      }

    }


  },
  determineVelocity:function () {
    return Math.floor(Math.random() * 6) + 1;
  },

  //Haal werk uit de vorige stage aan de hand van hoeveel velocity je hebt
  getWork:function(velocity){
    

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