var Stage = ReadyWorkProvider.extend({
  defaults:{
    name:"",
    velocity:0,
    remainingVelocity:0,
    nextStage:null,
    readyWorkProvider:null
  },

  initialize:function () {
    this.constructor.__super__.initialize.apply(this, arguments);

    if (!this.get("inProgressWork")) {
      this.set("inProgressWork", new Array());
    }
  },

  runStage:function () {
    this._updateVelocity();

    while(this._canPerformWork()) {
      if (this._emptyInProgressWork()) {
        if(!this._canPullWork()) {
          break;
        }
        this._pullWorkFromProvider();
      }
      this._performWork();
    }
  },

  _canPerformWork: function() {
    return this.get("remainingVelocity") > 0;
  },

  _canPullWork: function() {
    return this.get("readyWorkProvider").hasMoreReadyWork();
  },

  _emptyInProgressWork:function () {
    return this.get("inProgressWork").length == 0;
  },

  _pullWorkFromProvider:function () {
    var work = this.get("readyWorkProvider").getNextReadyWork();
    if (work !== undefined) {
      var inProgressWork = this.get("inProgressWork");
      inProgressWork.push(work);
      this.trigger("change:inProgressWork");
    } else {
      throw new Error("no work remaining");
    }
  },

  _performWork: function() {
    var velocity = this.get("remainingVelocity");

    var work = this.get("inProgressWork").shift();
    var workForStage = work.get(this.get("name").toLowerCase());
    var leftOver = workForStage - velocity;
    if(leftOver <= 0) {
      this.get("readyWork").push(work);
      this.trigger("change:readyWork");
    } else {
      this.get("inProgressWork").unshift(work);
    }

    this.set("remainingVelocity", Math.max(velocity - workForStage, 0));
  },

  _updateVelocity:function () {
    var velocity = this._randomVelocity();
    this.set("velocity", velocity);
    this.set("remainingVelocity", velocity);
  },

  _randomVelocity: function() {
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
    var template = _.template($("#stage-template").html(), {stage:this.model});
    this.$el.html(template);
    return this;
  },

  runStage:function () {
    this.model.runStage();
  }
});