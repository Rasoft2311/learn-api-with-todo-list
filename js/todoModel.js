(function (module) {
    function TodoModel() {
        this.todo = null;
    }

    TodoModel.prototype.asyncGetTodo = function (todoId, callback) {
        var self = this;
        var xml = new XMLHttpRequest()
        xml.open('GET', 'http://localhost:3000/api/todos/' + todoId, true)
        xml.onload = function () {
            console.log('Request status code: ', xml.status, '; status text: ', xml.statusText)
            if (xml.status >= 200 && xml.status < 300) {
                console.log(JSON.parse(xml.responseText));
                self.todo = JSON.parse(xml.responseText);
                callback(null);
            } else {
                console.log('Something went wrong :(');
                callback(new Error(xml.statusText));
            }
        }
        xml.send()
    }

    TodoModel.prototype.asyncCompleteTodo = function (todoId, callback) {
        var self = this;
        var xml = new XMLHttpRequest()
        // HTTP PATCH метод означає, що ми хочемо модифікувати або замінити частину ресурсу.
        // У даноми прикладі ми хочемо змінити статус todo'шки на completed
        xml.open('PATCH', 'http://localhost:3000/api/todos/' + todoId, true)
        // Важливо вказати, якого типу ми будемо надсилати дані на сервер
        // У нашому випадку це буде JSON, який ми передаємо при виклику методу xml.send(...)
        xml.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        xml.onload = function () {
            console.log('Request status code: ', xml.status, '; status text: ', xml.statusText)
            if (xml.status >= 200 && xml.status < 300) {
                console.log(JSON.parse(xml.responseText));
                self.todo = JSON.parse(xml.responseText);
                callback(null);
            } else {
                console.log('Something went wrong :(')
                callback(new Error(xml.statusText))
            }
        }
        // Зверни увагу на те, що ми перетворюємо JS'овий об'єкт на JSON перед тим як відправити його на сервер
        xml.send(JSON.stringify({
            completed: true
        }))
    }

    TodoModel.prototype.asyncUndoTodo = function (todoId, callback) {
        var self = this;
        var xml = new XMLHttpRequest()
        // HTTP PATCH метод означає, що ми хочемо модифікувати або замінити частину ресурсу.
        // У даноми прикладі ми хочемо змінити статус todo'шки на completed
        xml.open('PATCH', 'http://localhost:3000/api/todos/' + todoId, true)
        // Важливо вказати, якого типу ми будемо надсилати дані на сервер
        // У нашому випадку це буде JSON, який ми передаємо при виклику методу xml.send(...)
        xml.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        xml.onload = function () {
            console.log('Request status code: ', xml.status, '; status text: ', xml.statusText)
            if (xml.status >= 200 && xml.status < 300) {
                console.log(JSON.parse(xml.responseText));
                self.todo = JSON.parse(xml.responseText);
                callback(null);
            } else {
                console.log('Something went wrong :(')
                callback(new Error(xml.statusText));
            }
        }
        // Зверни увагу на те, що ми перетворюємо JS'овий об'єкт на JSON перед тим як відправити його на сервер
        xml.send(JSON.stringify({
            completed: false
        }))
    }

    module.TodoModel = TodoModel;

})(window.module);