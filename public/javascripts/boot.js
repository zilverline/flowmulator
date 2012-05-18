var createWorkItems = function () {
  return [
    {name:"Feature #1", analysis:3, design:3, code:5, test:3, release:2},
    {name:"Feature #2", analysis:3, design:2, code:5, test:3, release:3},
    {name:"Feature #3", analysis:4, design:2, code:6, test:3, release:3},
    {name:"Feature #4", analysis:3, design:3, code:6, test:3, release:3}
  ];
};

var createStages = function () {
    
    var release = new Stage({name:"Release",  nextStage: null});
    var test = new Stage({name:"Test",  nextStage: release});
    var code = new Stage({name:"Code",  nextStage: test});
    var design = new Stage({name:"Design",  nextStage: code});

    var backlog = new Stage({name:"Backlog", workItems: createWorkItems()});

    var analysis = new Stage({name:"Analysis", previousStage: backlog, nextStage: design});

  return [analysis, design, code, test, release];
};

$(function () {

  var startup = function () {
    var board = new Board({stages: createStages()});
    var controlPanel = new ControlPanel();
    var backlog = new Backlog(createWorkItems());
    var flowmulator = new Flowmulator({backlog:backlog, board:board, controlPanel:controlPanel});
    new FlowmulatorView({model:flowmulator}).render();
  };

  startup();
});