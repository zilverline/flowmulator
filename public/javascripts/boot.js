var createWorkItems = function () {
  return [
    new WorkItem({name:"Feature #1", analysis:3, design:3, code:5, test:3, release:2}),
    new WorkItem({name:"Feature #2", analysis:3, design:2, code:5, test:3, release:3})
  ];
};

var createStages = function (backlog) {
  var analysis = new Stage({name:"Analysis", workSource:backlog});
  var design = new Stage({name:"Design", workSource:analysis});
  return [analysis, design];
};

$(function () {

  var startup = function () {
    var backlog = new ReadyWorkSource({readyWork:createWorkItems()});
    var board = new Board({stages:createStages(backlog)});
    var controlPanel = new ControlPanel();
    var flowmulator = new Flowmulator({backlog:backlog, board:board, controlPanel:controlPanel});
    new FlowmulatorView({model:flowmulator}).render();
  };

  startup();
});