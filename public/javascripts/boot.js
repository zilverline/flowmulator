$(function () {
  var createWorkItems = function () {
    var NUMBER_OF_WORKITEMS = 30;
    var workList = [];

    for (var i = 0; i < NUMBER_OF_WORKITEMS; i++) {
      workList[i] = new WorkItem({name:"Feature #" + (i + 1)});
    }

    return workList;
  };

  var createStages = function (backlog) {
    var analysis = new Stage({name:"Analysis", readyWorkProvider:backlog, wipLimit: 10});
    var design = new Stage({name:"Design", readyWorkProvider:analysis, wipLimit: 10});
    var code = new Stage({name:"Code", readyWorkProvider:design, wipLimit: 10});
    var test = new Stage({name:"Test", readyWorkProvider:code, wipLimit: 10});
    var release = new Stage({name:"Release", readyWorkProvider:test, wipLimit: 10});
    return [analysis, design, code, test, release];
  };

  var startup = function () {
    var backlog = new ReadyWorkProvider({readyWork:createWorkItems()});
    var board = new Board({backlog: backlog, stages:createStages(backlog)});
    var controlPanel = new ControlPanel();
    var flowmulator = new Flowmulator({board:board, controlPanel:controlPanel});
    new FlowmulatorView({model:flowmulator}).render();
  };

  startup();

});