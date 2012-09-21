var Stage = ReadyWorkProvider.extend({
  defaults:{
    name:"",
    velocity:0,
    remainingVelocity:0,
    nextStage:null,
    readyWorkProvider:null,
    wipLimit:1
  },

  initialize:function () {
    this.constructor.__super__.initialize.apply(this, arguments);

    if (!this.get("inProgressWork")) {
      this.set("inProgressWork", new Array());
    }
  },

  runStage:function () {
    this._updateVelocity();
    this._fillInProgressWorkUpToWipLimit();
    this._updateTime();
    this._distributeVelocityAmongstInProgressWork();
  },

  _fillInProgressWorkUpToWipLimit:function () {
    var readyWorkProvider = this.get("readyWorkProvider");
    var inProgressWork = this.get("inProgressWork");
    while (readyWorkProvider.hasMoreReadyWork() && inProgressWork.length < this.get("wipLimit")) {
      var work = readyWorkProvider.getNextReadyWork();
      var remainingEffort = work.get(this.get("name").toLowerCase());
      work.set("remainingEffortInStage", remainingEffort);
      if (remainingEffort > 0) {
        inProgressWork.push(work);
      } else {
        this.get("readyWork").push(work);
      }
    }
    this.trigger("change:inProgressWork");
    this.trigger("change:readyWork");
  },

  _distributeVelocityAmongstInProgressWork:function () {
    var velocity = this.get("velocity");
    var inProgressWork = this.get("inProgressWork");
    var cursor = 0;

    for (var i = 0; i < velocity; i++) {
      var work = inProgressWork[cursor];
      if (work !== undefined) {
        work.performWork();

        if (work.get("remainingEffortInStage") == 0) {
          inProgressWork.splice(cursor, 1);
          this.get("readyWork").push(work);
          this._fillInProgressWorkUpToWipLimit();
        } else {
          cursor++;
        }

        if (cursor >= inProgressWork.length) {
          cursor = 0;
        }
      }
    }

    this.trigger("change:inProgressWork");
    this.trigger("change:readyWork");
  },

  _updateTime:function () {
    this._raiseTime("inProgressWork", "workTime");
    this._raiseTime("readyWork", "waitTime");
  },

  _raiseTime:function (list, time) {
    var workItems = this.get(list);
     for (var i = 0; i < workItems.length; i++) {
       var oldtime = workItems[i].get(time);
       workItems[i].set(time, oldtime + 1);
     };
  },

  _updateVelocity:function () {
    var velocity = this._randomVelocity();
    this.set("velocity", velocity);
    this.set("remainingVelocity", velocity);
  },

  _randomVelocity:function () {
    return Math.floor(Math.random() * 6) + 1;
  }

});

var StageView = Backbone.View.extend({
  tagName:"div",
  className:"span2",

  events:{
    "click .run-stage":"runStage",
    "change .wip-limit":"updateWipLimit"
  },

  initialize:function () {
    _.bindAll(this, "render", "updateWipLimit");
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
  },

  updateWipLimit: function(event) {
    this.model.set("wipLimit", event.target.value);
  }
});