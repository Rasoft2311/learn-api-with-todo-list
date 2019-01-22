(function (module) {
    function TodosController(view,model) {
        this.view = view;
        this.model = model;

        this.initiallize();
    }

    TodosController.prototype.initiallize = function () {
    var self = this;

        self.view.onInputEnter = function (evt) {
            if (evt.keyCode === 13 && evt.target.value !== ""){
                var newTodoText = evt.target.value;
                var newTodo = {};
                newTodo.userId = 9;
                newTodo.title = newTodoText;
                newTodo.completed = false;
                self.model.asyncCreateTodo(newTodo,function (err) {
                    if(err)alert("ERROR")
                    else{
                        self.view.addCreatedTodoOnPage(self.model);
                        self.view.resetInput();
                    }
                })
            }
        }

        self.model.asyncGetTodos(9,function (err) {
            if(err)alert("Error occured, try again");
            else {
                self.view.render(self.model);
            }
        });
    };


    module.TodosController = TodosController;
})(window.module);