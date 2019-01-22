(function (module) {
    function TodoView(wrap) {
        this.wrap = wrap;
        this.onDoneClick = null;
        this.onDeleteClick = null;
    }

    TodoView.prototype.render = function (model) {
        var todo = model.todo;

        this.wrap.innerHTML = `
            <input class="todo__switcher" type="checkbox">
            <span class="todo__title">${todo.title}</span>
            <button class="todo__delete">Delete</button>
        `;
        if(todo.completed===true)this.wrap.querySelector(".todo__title").classList.add("todo__title--done");
        if(todo.completed===true)this.wrap.querySelector(".todo__switcher").checked = true;
        else this.wrap.querySelector(".todo__switcher").checked = false;
        this.wrap.querySelector(".todo__switcher").addEventListener("click",this.onDoneClick);
        this.wrap.querySelector(".todo__delete").addEventListener("click",this.onDeleteClick);
    };

    TodoView.prototype.switchDone = function () {
        this.wrap.querySelector(".todo__title").classList.toggle("todo__title--done");
    };

    TodoView.prototype.deleteTodo = function () {
        this.wrap.remove();
    };



    module.TodoView = TodoView;
})(window.module);