var Metrics = Backbone.Model.extend({
  defaults:{
    totalWorktime: 0,
    totalWaittime: 0,
    numberOfReadyStories: 0,
    averageWorkTime: 0,
    averageWaitTime: 0,
    averageTotalTime: 0,
    daysPassed: 0
  },
  
  addDay: function(){
    var days = this.get("daysPassed");
    this.set("daysPassed", days + 1);
  },

  newStoryDone: function(workItem) {
    this.updateTotalWorktime(workItem);
    this.updateTotalWaittime(workItem);
    this.updateNumberOfReadyStories(workItem);

    this.updateAverages();
  },

  updateAverages: function(){
    var newAverageWork = Math.round(this.get("totalWorktime") / this.get("numberOfReadyStories") * 10) / 10;
    this.set("averageWorkTime", newAverageWork);

    var newAverageWait = Math.round(this.get("totalWaittime") / this.get("numberOfReadyStories") * 10) / 10;
    this.set("averageWaitTime", newAverageWait);

    var newAverageTotal = Math.round( ( this.get("totalWaittime") + this.get("totalWorktime") ) / this.get("numberOfReadyStories") * 10) / 10;
    this.set("averageTotalTime", newAverageTotal);

  },

  updateTotalWorktime: function(workItem){
    var oldTotalWorkTime = this.get("totalWorktime");
    var newTotalWorkTime = oldTotalWorkTime + workItem.get("workTime");
    this.set("totalWorktime", newTotalWorkTime);
  },

  updateTotalWaittime: function(workItem){
    var oldTotalWaitTime = this.get("totalWaittime");
    var newTotalWaitTime = oldTotalWaitTime + workItem.get("waitTime");
    this.set("totalWaittime", newTotalWaitTime);

  },

  updateNumberOfReadyStories: function(workItem){
    var oldReady = this.get("numberOfReadyStories");
    this.set("numberOfReadyStories", oldReady + 1);
  }
  
});

var MetricsView = Backbone.View.extend({
  id:"metrics",
  className:"row-fluid",

  render:function () {
    var template = _.template($("#metrics-template").html(), {metrics:this.model});
    this.$el.html(template);
    return this;
  },

  initialize:function () {
    _.bindAll(this, "render");
    this.model.bind("change:averageWorkTime", this.render);
    this.model.bind("change:averageWaitTime", this.render);
    this.model.bind("change:daysPassed", this.render);
  }
});