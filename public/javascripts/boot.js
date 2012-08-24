var createWorkItems = function () {
  var workList = [];

  for (var i = 0; i < 100; i++) {
   workList[i] = new WorkItem({name:"Feature #"+i});  
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