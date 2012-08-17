var Stage = ReadyWorkSource.extend({
  defaults:{
    name:"",
    velocity:0,
    nextStage:null,
    workSource:null
  },

  initialize: function() {
    this.constructor.__super__.initialize.apply(this, arguments);

    if(!this.get("inProgressWork")) {
      this.set("inProgressWork", new Array());
    }
  },

  runStage:function () {
    this.set("velocity", this.determineVelocity());

    var inProgressWork = this.get("inProgressWork");
    if (inProgressWork.length == 0) {
      var workSource = this.get("workSource");
      var work = workSource.getReadyWork();
      if (work !== undefined) {
        inProgressWork.push(work);
        this.trigger("change:inProgressWork");
      }
    } else {
      var work = inProgressWork.shift();
      this.get("readyWork").push(work);
      this.trigger("change:readyWork");
    }
  },

  determineVelocity:function () {
    return Math.floor(Math.random() * 6) + 1;
  }
});

var StageView = Backbone.View.extend({
  tagName:"li",
  className:"stage",

  events:{
    "click .run-stage":"runStage"
  },

  initialize:function () {
    _.bindAll(this, "render");
    this.model.bind("change:velocity", this.render);
    this.model.bind("change:inProgressWork", this.render);
    this.model.bind("change:readyWork", this.render);
  },

  render:function () {
    console.log("Rendering", this.model.get("name"));
    var template = _.template($("#stage-template").html(), {stage:this.model});
    this.$el.html(template);
    return this;
  },

  runStage:function () {
    this.model.runStage();
  }
});