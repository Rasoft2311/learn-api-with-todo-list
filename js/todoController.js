(function (module) {
    function TodoController(view, model,fatherView,todoId) {
        this.view = view;
        this.model = model;
        this.fatherView = fatherView;
        this.todoId = todoId;

        this.initiallize();
    }

    TodoController.prototype.initiallize = function () {
        var self = this;


        self.view.onDoneClick = function (evt) {
            var todoToBeDoneId = Number(evt.target.dataset.todoId);
            if(self.model.todo.completed === false) self.model.asyncCompleteTodo(todoToBeDoneId, function (err) {
                if(err)alert("Error occured, try again");
                else {
                    self.view.switchDone();
                }

            });
            else self.model.asyncUndoTodo(todoToBeDoneId,function (err) {
                if(err)alert("Error occured, try again");
                else {
                    self.view.switchDone();
                }
            });

        };

        self.model.asyncGetTodo(this.todoId, function (err) {
            if(err)alert("Error occured, try again");
            else {
                self.view.render(self.model);
            }
        });


    }

    module.TodoController = TodoController;

})(window.module);