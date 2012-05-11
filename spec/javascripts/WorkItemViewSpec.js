describe("WorkItemView", function () {

  beforeEach(function () {
    this.model = new Backbone.Model({
      name: "Feature #1"
    });
    this.view = new WorkItemView({model:this.model});
  });

  describe("Rendering", function () {

    it("should return the view object", function () {
      expect(this.view.render()).toEqual(this.view);
    });

    it("should produce the correct html", function () {
      this.view.render();
      expect(this.view.el.innerHTML).toEqual("<li><h1>Feature #1</h1></li>");
    });

  });

});
