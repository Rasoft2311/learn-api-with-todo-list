(function (module) {
    function TodosView(wrap) {
        this.wrap = wrap;
        this.onInputEnter = null;
    }

    TodosView.prototype.render = function (model) {
        var self = this;
        var allTodos = model.todos;

        this.wrap.innerHTML  = `
        <input class="addTodoInput" type="text">
        <div class="todosList"></div>
        `;

        allTodos.forEach(function (el) {
            var todosListEl = self.wrap.querySelector(".todosList");
            var oneTodoEl = document.createElement("div");
            oneTodoEl.classList.add("oneTodo");
            todosListEl.appendChild(oneTodoEl);
            var todoId = el.id;
            var oneTodoView = new module.TodoView(oneTodoEl);
            var oneTodoModel = new module.TodoModel();
            var oneTodoController = new module.TodoController(oneTodoView,oneTodoModel,this,todoId);
        });
        self.wrap.querySelector(".addTodoInput").addEventListener("keyup",self.onInputEnter);

    };

    TodosView.prototype.addCreatedTodoOnPage = function (model) {
        var todosListEl = this.wrap.querySelector(".todosList");
        var oneTodoEl = document.createElement("div");
        oneTodoEl.classList.add("oneTodo");
        todosListEl.insertAdjacentElement("afterBegin",oneTodoEl);
        var oneTodoView = new module.TodoView(oneTodoEl);
        var oneTodoModel = new module.TodoModel();
        var oneTodoController = new module.TodoController(oneTodoView,oneTodoModel,this,model.createdTodo.id);
    };

    TodosView.prototype.resetInput = function () {
      this.wrap.querySelector(".addTodoInput").value = "";
    };



    module.TodosView = TodosView;

})(window.module);