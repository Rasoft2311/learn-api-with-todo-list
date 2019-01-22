(function (module) {
    function TodosModel() {
        this.todos = [];
        this.createdTodo = null;
    }
    
    TodosModel.prototype.asyncGetTodos = function (userId, callback) {
        var self = this;
        var xml = new XMLHttpRequest()
        xml.open('GET', 'http://localhost:3000/api/todos?userId=' + userId, true)
        xml.onload = function () {
            console.log('Request status code: ', xml.status, '; status text: ', xml.statusText)
            if (xml.status >= 200 && xml.status < 300) {
                self.todos = JSON.parse(xml.responseText)
                console.log(JSON.parse(xml.responseText))
                callback(null)
            } else {
                console.log('Something went wrong :(')
                callback(new Error(xml.statusText))
            }
        };
        xml.send()
    };

    TodosModel.prototype.asyncCreateTodo = function  (todo, callback) {
        var self = this;
        var xml = new XMLHttpRequest()
        // Використовуємо POST метод оскільки ми хочемо створити новий об'єкт у базі даних,
        // А ще ми не вказуємо id нашого todo, як ми це робили для запиту GET http://localhost:3000/api/todos/200
        // бо у випадку створення нової todo'шки бекенд сам створить id.
        xml.open('POST', 'http://localhost:3000/api/todos', true)
        // Важливо вказати, якого типу ми будемо надсилати дані на сервер
        // У нашому випадку це буде JSON, який ми передаємо при виклику методу xml.send(...)
        xml.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        xml.onload = function () {
            console.log('Request status code: ', xml.status, '; status text: ', xml.statusText)
            if (xml.status >= 200 && xml.status < 300) {
                self.createdTodo = JSON.parse(xml.responseText);
                console.log(JSON.parse(xml.responseText))
                callback(null);
            } else {
                console.log('Something went wrong :(')
                callback(new Error(xml.statusText))
            }
        }
        xml.send(JSON.stringify(todo))
    }


    module.TodosModel = TodosModel;

})(window.module);