describe("Stage", function() {

  var stage;
  var someFeature;
  var anotherFeature;
  beforeEach(function () {
    stage = new Stage({name: "Analysis"});
    someFeature = new WorkItem({name: "Some feature", analysis: 3});
    anotherFeature = new WorkItem({name: "Another feature", analysis: 5});
  });

  describe("given a stage with a ready work provider", function() {

    var readyWorkProvider;
    beforeEach(function() {
      readyWorkProvider = new ReadyWorkProvider();
      stage.set("readyWorkProvider", readyWorkProvider);
    });

    it("should pull work from a ready work provider", function() {
      readyWorkProvider.set("readyWork", [someFeature]);
      spyOn(stage, "randomVelocity").andReturn(1);

      stage.runStage();

      expect(stage.get("inProgressWork").length).toEqual(1);
    });

    describe("given a stage with work in progress", function() {

      beforeEach(function () {
        stage.set("inProgressWork", [someFeature]);
      });

      it("should move work from in progress to ready when there is enough velocity", function() {
        spyOn(stage, "randomVelocity").andReturn(3);

        stage.runStage();

        expect(stage.get("inProgressWork").length).toEqual(0);
        expect(stage.get("readyWork").length).toEqual(1);
      });

      it("should continue moving work from in progress to ready until velocity is consumed", function () {
        readyWorkProvider.set("readyWork", [anotherFeature]);
        spyOn(stage, "randomVelocity").andReturn(5);

        stage.runStage();

        expect(stage.get("inProgressWork").length).toEqual(1);
        expect(stage.get("readyWork").length).toEqual(1);
      });

    });

    it("should not move work from in progress to ready when there is not enough velocity", function() {
      readyWorkProvider.set("readyWork", [someFeature, anotherFeature]);
      spyOn(stage, "randomVelocity").andReturn(2);

      stage.runStage();

      expect(stage.get("inProgressWork").length).toEqual(1);
      expect(stage.get("readyWork").length).toEqual(0);
    });

    it("should do nothing when there is remaining velocity but no in progress work and no ready work", function () {
      spyOn(stage, "randomVelocity").andReturn(1);

      stage.runStage();

      expect(stage.get("inProgressWork").length).toEqual(0);
      expect(stage.get("readyWork").length).toEqual(0);
    });

  });

});