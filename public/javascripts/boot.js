var createWorkItems = function () {
  return [
    new WorkItem({name:"Feature #1", analysis:2, design:2, code:4, test:2, release:1}),
    new WorkItem({name:"Feature #2", analysis:2, design:2, code:4, test:3, release:1}),
    new WorkItem({name:"Feature #3", analysis:3, design:2, code:6, test:3, release:2}),
    new WorkItem({name:"Feature #4", analysis:3, design:2, code:5, test:2, release:2}),
    new WorkItem({name:"Feature #5", analysis:3, design:2, code:6, test:4, release:2}),
    new WorkItem({name:"Feature #6", analysis:3, design:1, code:4, test:2, release:1}),
    new WorkItem({name:"Feature #7", analysis:2, design:2, code:4, test:2, release:2}),
    new WorkItem({name:"Feature #8", analysis:3, design:1, code:5, test:2, release:2}),
    new WorkItem({name:"Feature #9", analysis:2, design:0, code:3, test:2, release:1}),  
    new WorkItem({name:"Feature #10", analysis:2, design:1, code:4, test:2, release:2})  
  ];
};

var createStages = function (backlog) {
  var analysis = new Stage({name:"Analysis", readyWorkProvider:backlog});
  var design = new Stage({name:"Design", readyWorkProvider:analysis});
  var code = new Stage({name:"Code", readyWorkProvider:design});
  var test = new Stage({name:"Test", readyWorkProvider:code});
  var release = new Stage({name:"Release", readyWorkProvider:test});
  return [analysis, design, code, test, release];
};

$(function () {

  var startup = function () {
    var backlog = new ReadyWorkProvider({readyWork:createWorkItems()});
    var board = new Board({stages:createStages(backlog)});
    var controlPanel = new ControlPanel();
    var flowmulator = new Flowmulator({backlog:backlog, board:board, controlPanel:controlPanel});
    new FlowmulatorView({model:flowmulator}).render();
  };

  startup();
});