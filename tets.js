function updateLocalStorage() {
    const todoItems = [];
    const todoElements = document.querySelectorAll('.todo_lists_li');

    todoElements.forEach((element) => {
        const todo = {
            text: element.querySelector('h3').innerText,
            completed: element.classList.contains('completed'),
        };
        todoItems.push(todo);
    });

    localStorage.setItem('todos', JSON.stringify(todoItems));
}

function populateTodoListFromLocalStorage() {
    const storedData = localStorage.getItem('todos');
    if (storedData) {
        const todoItems = JSON.parse(storedData);
        todoItems.forEach((todo) => {
            let li = document.createElement("li");
            li.classList.add("todo_lists_li");
            todo_lists.appendChild(li);
            let div = document.createElement("div");
            li.appendChild(div)
            let checkbox = document.createElement("input")
            checkbox.type = "checkbox";
            checkbox.id = "checkbox";
            checkbox.className = "checkbox";
            div.appendChild(checkbox)
            let h3 = document.createElement("h3");
            h3.innerHTML = todo.text;
            div.appendChild(h3)
            let button = document.createElement("button");
            button.className = "delete";
            li.appendChild(button);
            let icon = document.createElement("i");
            icon.className = "fa-solid fa-x";
            button.appendChild(icon);


            if (todo.completed) {
                checkbox.checked = true;
                h3.classList.add('textLine');

                button.classList.remove('d-none');
                li.classList.add('completed');
            }

            todo_lists.appendChild(li);
        });
    }
}

// Call this function when the page loads to populate the todo list from local storage
populateTodoListFromLocalStorage();