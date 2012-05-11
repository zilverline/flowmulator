describe("Stage", function() {
  var backlog;
  var stage;

  beforeEach(function() {
    backlog = new Backlog();
    stage = new Stage({backlog: backlog});
  });

  it("should initialize", function() {
    expect(stage.get("velocity")).toEqual(0);
  });

  it("should determine a random velocity", function() {
    var velocity = stage.determineVelocity();
    expect(velocity).toBeGreaterThan(0);
    expect(velocity).toBeLessThan(7);
  });

  describe("Analysis", function() {
    it("should pull a new item from the backlog nothing is in progress", function() {
      var first = new WorkItem();
      backlog.add(first);

      spyOn(stage, "determineVelocity").andReturn(1);
      stage.runOneDay();
      expect(stage.get("velocity")).toEqual(1);
      var workItems = stage.get("workItems");
      expect(workItems.length).toEqual(1);
      expect(workItems[0]).toBe(first);
    });
  });

});