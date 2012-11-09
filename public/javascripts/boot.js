$(function () {

  var NUMBER_OF_WORKITEMS = 50;

  var createWorkItems = function () {
    var workList = [];

    for (var i = 0; i < NUMBER_OF_WORKITEMS; i++) {
      workList[i] = new WorkItem({name:"Feature #" + (i + 1)});
    }

    return workList;
  };

  window.createStages = function (backlog, metrics) {
    var DEFAULT_WIP_LIMIT = 8;
    var analysis = new Stage({name:"Analysis", readyWorkProvider:backlog, wipLimit: DEFAULT_WIP_LIMIT, metrics:metrics});
    var design = new Stage({ name:"Design", readyWorkProvider:analysis, wipLimit: DEFAULT_WIP_LIMIT, metrics:metrics});
    var code = new Stage({ name:"Code", readyWorkProvider:design, wipLimit: DEFAULT_WIP_LIMIT, metrics:metrics});
    var test = new Stage({ name:"Test", readyWorkProvider:code, wipLimit: DEFAULT_WIP_LIMIT, metrics:metrics});
    var release = new Stage({ name:"Release", readyWorkProvider:test, wipLimit: DEFAULT_WIP_LIMIT, endStage: true, metrics:metrics, numberOfWorkItems:NUMBER_OF_WORKITEMS});
    return [analysis, design, code, test, release];
  };

  window.startup = function (workItems) {
    var metrics = new Metrics();
    var backlog = new ReadyWorkProvider({readyWork:workItems});
    var stages = createStages(backlog, metrics);
    var board = new Board({backlog: backlog, stages:stages, metrics:metrics});
    var controlPanel = new ControlPanel();
    var flowmulator = new Flowmulator({board:board, controlPanel:controlPanel, metricsPanel:metrics});
    new FlowmulatorView({model:flowmulator}).render();
  };

  var workItems = createWorkItems();
  window.workItems = _.map(workItems, function(workItem) { return workItem });
  startup(workItems);

});