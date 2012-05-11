describe("BacklogView", function () {

  beforeEach(function () {
    this.view = new BacklogView();
  });

  describe("Rendering", function () {

    beforeEach(function () {
      this.workItem1 = new WorkItem({name:"Feature #1"});
      this.workItem2 = new WorkItem({name:"Feature #2"});
      this.backlog = new Backlog([this.workItem1, this.workItem2]);
      this.workItemView = new Backbone.View();
      this.workItemView.render = function() {
        this.el = document.createElement('li');
        return this;
      };
      this.workItemRenderSpy = sinon.spy(this.workItemView, "render");
      this.workItemViewStub = sinon.stub(window, "WorkItemView").returns(this.workItemView);
      this.view.collection = this.backlog;
      this.view.render();
    });

    afterEach(function () {
      window.WorkItemView.restore();
    });

    it("should create a WorkItemView for each WorkItem", function () {
      expect(this.workItemViewStub).toHaveBeenCalledTwice();
      expect(this.workItemViewStub).toHaveBeenCalledWith({model:this.workItem1});
      expect(this.workItemViewStub).toHaveBeenCalledWith({model:this.workItem2});
    });

    it("should render each WorkItemView view", function () {
      expect(this.workItemView.render).toHaveBeenCalledTwice();
    });

    it("should append the work item to the backlog", function () {
      expect($(this.view.el).children().length).toEqual(2);
    });

  });

});