describe("Stage", function () {

  var stage;
  var readyWorkProvider;
  var someFeature;
  var anotherFeature;
  beforeEach(function () {
    readyWorkProvider = new ReadyWorkProvider();
    stage = new Stage({readyWorkProvider:readyWorkProvider, name:"Analysis"});
    someFeature = new WorkItem({name:"Some feature", analysis:3, remainingEffortInStage:3});
    anotherFeature = new WorkItem({name:"Another feature", analysis:5, remainingEffortInStage:5});
  });

  describe("given a stage with WIP limit 1", function () {

    it("should pull work from a ready work provider", function () {
      readyWorkProvider.set("readyWork", [someFeature]);
      spyOn(stage, "_randomVelocity").andReturn(1);

      stage.runStage();

      expect(stage.get("inProgressWork").length).toEqual(1);
    });

    describe("given a stage with work in progress", function () {

      beforeEach(function () {
        stage.set("inProgressWork", [someFeature]);
      });

      it("should move work from in progress to ready when there is enough velocity", function () {
        spyOn(stage, "_randomVelocity").andReturn(3);

        stage.runStage();

        expect(stage.get("inProgressWork").length).toEqual(0);
        expect(stage.get("readyWork").length).toEqual(1);
        expect(someFeature.get("remainingEffortInStage")).toEqual(0);
      });

      it("should not continue moving work from in progress to ready because WIP Limit is reached", function () {
        readyWorkProvider.set("readyWork", [anotherFeature]);
        spyOn(stage, "_randomVelocity").andReturn(5);

        stage.runStage();

        expect(stage.get("inProgressWork").length).toEqual(0);
        expect(stage.get("readyWork").length).toEqual(1);
        expect(someFeature.get("remainingEffortInStage")).toEqual(0);
        expect(anotherFeature.get("remainingEffortInStage")).toEqual(5);
      });

    });

    it("should not move work from in progress to ready when there is not enough velocity", function () {
      readyWorkProvider.set("readyWork", [someFeature, anotherFeature]);
      spyOn(stage, "_randomVelocity").andReturn(2);

      stage.runStage();

      expect(stage.get("inProgressWork").length).toEqual(1);
      expect(stage.get("readyWork").length).toEqual(0);
      expect(someFeature.get("remainingEffortInStage")).toEqual(1);
    });

    it("should do nothing when there is remaining velocity but no in progress work and no ready work", function () {
      spyOn(stage, "_randomVelocity").andReturn(1);

      stage.runStage();

      expect(stage.get("inProgressWork").length).toEqual(0);
      expect(stage.get("readyWork").length).toEqual(0);
    });

  });

  describe("given a stage with WIP limit 2", function () {

    var lameFeature;
    beforeEach(function () {
      stage.set("wipLimit", 2);
      lameFeature = new WorkItem({name:"Lame feature", analysis:1, remainingEffortInStage:1});
    });

    it("should pull work up to the WIP limit", function () {
      readyWorkProvider.set("readyWork", [someFeature, anotherFeature, lameFeature]);

      stage._fillInProgressWorkUpToWipLimit();

      expect(stage.get("inProgressWork")).toEqual([someFeature, anotherFeature]);
      expect(readyWorkProvider.get("readyWork")).toEqual([lameFeature]);
    });

    it("should pull work up to the WIP limit even if there is already work in progress", function () {
      readyWorkProvider.set("readyWork", [anotherFeature]);
      stage.set("inProgressWork", [someFeature]);

      stage._fillInProgressWorkUpToWipLimit();

      expect(stage.get("inProgressWork")).toEqual([someFeature, anotherFeature]);
      expect(readyWorkProvider.get("readyWork")).toEqual([]);
    });

    it("should pull work up to the WIP limit until the ready work provider is empty", function () {
      readyWorkProvider.set("readyWork", []);
      stage.set("inProgressWork", [someFeature]);

      stage._fillInProgressWorkUpToWipLimit();

      expect(stage.get("inProgressWork")).toEqual([someFeature]);
      expect(readyWorkProvider.get("readyWork")).toEqual([]);
    });

    describe("given a stage with enough in progress work", function () {

      beforeEach(function () {
        readyWorkProvider.set("readyWork", [lameFeature]);
        stage.set("inProgressWork", [someFeature, anotherFeature]);
      });

      it("should not pull work", function () {
        stage._fillInProgressWorkUpToWipLimit();

        expect(stage.get("inProgressWork")).toEqual([someFeature, anotherFeature]);
        expect(readyWorkProvider.get("readyWork")).toEqual([lameFeature]);
      });

      it("should distribute velocity amongst in progress work", function () {
        spyOn(stage, "_randomVelocity").andReturn(3);

        stage.runStage();

        expect(someFeature.get("remainingEffortInStage")).toEqual(1);
        expect(anotherFeature.get("remainingEffortInStage")).toEqual(4);
      });

      it("should not move work to ready because WIP Limit is reached", function () {
        spyOn(stage, "_randomVelocity").andReturn(6);

        stage.runStage();

        expect(someFeature.get("remainingEffortInStage")).toEqual(0);
        expect(anotherFeature.get("remainingEffortInStage")).toEqual(2);

        expect(stage.get("inProgressWork")).toEqual([anotherFeature]);
        expect(stage.get("readyWork")).toEqual([someFeature]);
      });

      it("should move work anywhere in the list to ready while distributing velocity amongst in progress work", function () {
        stage.set("inProgressWork", [someFeature, lameFeature, anotherFeature]);
        spyOn(stage, "_randomVelocity").andReturn(5);

        stage.runStage();

        expect(someFeature.get("remainingEffortInStage")).toEqual(1);
        expect(lameFeature.get("remainingEffortInStage")).toEqual(0);
        expect(anotherFeature.get("remainingEffortInStage")).toEqual(3);

        expect(stage.get("inProgressWork")).toEqual([someFeature, anotherFeature]);
        expect(stage.get("readyWork")).toEqual([lameFeature]);
      });

      it("should move work at the end of the list to ready while distributing velocity amongst in progress work", function () {
        stage.set("inProgressWork", [someFeature, anotherFeature, lameFeature]);
        spyOn(stage, "_randomVelocity").andReturn(5);

        stage.runStage();

        expect(someFeature.get("remainingEffortInStage")).toEqual(1);
        expect(lameFeature.get("remainingEffortInStage")).toEqual(0);
        expect(anotherFeature.get("remainingEffortInStage")).toEqual(3);

        expect(stage.get("inProgressWork")).toEqual([someFeature, anotherFeature]);
        expect(stage.get("readyWork")).toEqual([lameFeature]);
      });

      it("should move work at the start of the list to ready while distributing velocity amongst in progress work", function () {
        stage.set("inProgressWork", [lameFeature, someFeature, anotherFeature]);
        spyOn(stage, "_randomVelocity").andReturn(5);

        stage.runStage();

        expect(someFeature.get("remainingEffortInStage")).toEqual(1);
        expect(lameFeature.get("remainingEffortInStage")).toEqual(0);
        expect(anotherFeature.get("remainingEffortInStage")).toEqual(3);

        expect(stage.get("inProgressWork")).toEqual([someFeature, anotherFeature]);
        expect(stage.get("readyWork")).toEqual([lameFeature]);
      });

    });

    it("should never have a negative remaining effort", function () {
      someFeature.set("analysis", 0);
      readyWorkProvider.set("readyWork", [someFeature]);

      spyOn(stage, "_randomVelocity").andReturn(5);

      stage.runStage();

      expect(someFeature.get("remainingEffortInStage")).toEqual(0);
      expect(stage.get("readyWork")).toEqual([someFeature]);
      expect(stage.get("inProgressWork")).toEqual([]);
    });

  });

});