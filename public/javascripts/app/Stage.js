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
    console.log(this.get("workItems"));

    var workItems = this.get("workItems");
    
    if(workItems.length == 0){
      //Geen werk waar de stage mee bezig is.

      if(this.get("name") == "Analysis"){
        //Only Analysis can pull in work if it has velocity points left.
        this.set("workItems", this.getWork(this.get("velocity"), this.get("previousStage").get("workItems")));
        
      } else {
        //Other stages can only work on items that are Done in the previous stage.

      }

    }

    console.log(this.get("name"), this.get("previousStage"), this.get("nextStage"), workItems);
    

  },
  determineVelocity:function () {
    return Math.floor(Math.random() * 6) + 1;
  },

  //Haal werk uit de vorige stage aan de hand van hoeveel velocity je hebt
  getWork:function(velocity, workItemsToPickup){
    var returnList = [];
    var totalVelocity = 0;
    for (var i = 0; i < workItemsToPickup.length; i++) {
      var workItem = workItemsToPickup[i];

      if (totalVelocity + workItem.analysis <= velocity) {
        returnList.push(workItem);
        workItemsToPickup.shift(1);
        totalVelocity += workItem.analysis;
      } else {
         break;
      }
    };
    return returnList;
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