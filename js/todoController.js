(function (module) {
    function TodoController(view, model,fatherView,todoId) {
        this.view = view;
        this.model = model;
        this.todoId = todoId;

        this.initiallize();
    }

    TodoController.prototype.initiallize = function () {
        var self = this;

        self.view.onDeleteClick = function (evt) {
            self.model.asyncDeleteTodo(self.todoId,function (err) {
                if(err)alert("Problems here")
                else{
                    self.view.deleteTodo();
                }
            });
        };

        self.view.onDoneClick = function (evt) {
            if(self.model.todo.completed === false) self.model.asyncCompleteTodo(self.todoId, function (err) {
                if(err)alert("Error occured, try again");
                else {
                    self.view.switchDone();
                }

            });
            else self.model.asyncUndoTodo(self.todoId,function (err) {
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