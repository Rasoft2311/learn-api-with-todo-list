var todo = document.querySelector("#todos");
var todosView = new window.module.TodosView(todo);
var todosModel = new window.module.TodosModel();
new window.module.TodosController(todosView,todosModel);






