$(function () {
  var createWorkItems = function () {
    var workList = [];

    for (var i = 0; i < 10; i++) {
      workList[i] = new WorkItem({name:"Feature #" + (i + 1)});
    }

    return workList;
  };

  var createStages = function (backlog) {
    var analysis = new Stage({name:"Analysis", readyWorkProvider:backlog});
    var design = new Stage({name:"Design", readyWorkProvider:analysis});
    var code = new Stage({name:"Code", readyWorkProvider:design});
    var test = new Stage({name:"Test", readyWorkProvider:code});
    var release = new Stage({name:"Release", readyWorkProvider:test});
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