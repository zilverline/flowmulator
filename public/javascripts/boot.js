$(function () {
  var createWorkItems = function () {
    var NUMBER_OF_WORKITEMS = 50;
    var workList = [];

    for (var i = 0; i < NUMBER_OF_WORKITEMS; i++) {
      workList[i] = new WorkItem({name:"Feature #" + (i + 1)});
    }

    return workList;
  };

  window.createStages = function (backlog) {
    var DEFAULT_WIP_LIMIT = 10;
    var analysis = new Stage({name:"Analysis", readyWorkProvider:backlog, wipLimit: DEFAULT_WIP_LIMIT});
    var design = new Stage({name:"Design", readyWorkProvider:analysis, wipLimit: DEFAULT_WIP_LIMIT});
    var code = new Stage({name:"Code", readyWorkProvider:design, wipLimit: DEFAULT_WIP_LIMIT});
    var test = new Stage({name:"Test", readyWorkProvider:code, wipLimit: DEFAULT_WIP_LIMIT});
    var release = new Stage({name:"Release", readyWorkProvider:test, wipLimit: DEFAULT_WIP_LIMIT, endStage: true});
    return [analysis, design, code, test, release];
  };

  window.startup = function (workItems) {
    var backlog = new ReadyWorkProvider({readyWork:workItems});
    var board = new Board({backlog: backlog, stages:createStages(backlog)});
    var controlPanel = new ControlPanel();
    var flowmulator = new Flowmulator({board:board, controlPanel:controlPanel});
    new FlowmulatorView({model:flowmulator}).render();
  };

  var workItems = createWorkItems();
  window.workItems = _.map(workItems, function(workItem) { return workItem });
  startup(workItems);

});