var todo = document.querySelector("#todos");
var todoView = new window.module.TodoView(todo);
var todoModel = new window.module.TodoModel();
var todoController = new window.module.TodoController(todoView,todoModel,null,165);





