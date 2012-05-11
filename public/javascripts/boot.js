var createWorkItems = function () {
  return [
    {name:"Feature #1", analysis:3, design:3, code:5, test:3, release:2},
    {name:"Feature #2", analysis:3, design:2, code:5, test:3, release:3},
    {name:"Feature #3", analysis:4, design:2, code:6, test:3, release:3},
    {name:"Feature #4", analysis:3, design:3, code:6, test:3, release:3}
  ];
};

var createStages = function (backlog) {
  return [
    new Stage({name:"Analysis", backlog: backlog}),
    new Stage({name:"Design"}),
    new Stage({name:"Code"}),
    new Stage({name:"Test"}),
    new Stage({name:"Release"})
  ];
};

$(function () {

  var startup = function () {
    var backlog = new Backlog(createWorkItems());
    var board = new Board({stages: createStages(backlog)});
    var controlPanel = new ControlPanel();
    var flowmulator = new Flowmulator({backlog:backlog, board:board, controlPanel:controlPanel});
    new FlowmulatorView({model:flowmulator}).render();
  };

  startup();
});