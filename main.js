const add_todo = $('.add_todo');
const create_todo = document.querySelector('.create_todo');
const todo_lists = document.querySelector('.todo_lists');
const todo_lists_li = $('.todo_lists_li');
const delete_todo = document.querySelector('.delete');
let todosLeft = document.querySelector('#todosLeft');
let notification = document.querySelector(".notification")
let allFilter = document.querySelector("#all");
let activeFilter = document.querySelector("#active")
let completedFilter = document.querySelector("#completed");
let deletedList = document.querySelector(".deleted-lists")
let overlay = document.querySelector(".overlay")


let todoListArray = [];
let isLocalDatPresent = localStorage.getItem("todos")
if (isLocalDatPresent !== null) {
    todoListArray = JSON.parse(isLocalDatPresent)
}


let maxId = 0;
for (const todo of todoListArray) {
    if (todo.id > maxId) {
        maxId = todo.id;
    }
}
id = maxId + 1;

function saveTodo(val) {
    var todoObj = {
        id: id,
        text: val,
        completed: false,
        delete: false,
    }
    todoListArray.push(todoObj)
    localStorage.setItem("todos", JSON.stringify(todoListArray));
    id++;
}

function removeTodoFromLocalStorage(numb) {
    const storeData = localStorage.getItem("todos");
    if (storeData) {
        const totoItems = JSON.parse(storeData)
        const indextoRemove = totoItems.findIndex(todo => todo.id === numb)
        if (indextoRemove !== -1) {
            totoItems.splice(indextoRemove, 1)
            localStorage.setItem('todos', JSON.stringify(totoItems))
        }
    }

    if (todoListArray) {
        const a = todoListArray.findIndex(todo => todo.id === numb)
        if (a !== -1) {
            todoListArray.splice(a, 1)
        }
    }
}

function search() {
    if (event.keyCode == 13) {
        addTodo()
    }
}


function addTodo() {
    const create_todos = create_todo.value.trim();
    if (create_todos.length >= 3) {
        let li = document.createElement("li");
        li.setAttribute("key", id);

        li.classList.add("todo_lists_li");
        todo_lists.prepend(li);
        let div = document.createElement("div");
        li.appendChild(div)
        let checkbox = document.createElement("input")
        checkbox.type = "checkbox";
        div.appendChild(checkbox)
        let h3 = document.createElement("h3");
        h3.innerHTML = create_todos;
        div.appendChild(h3)
        let button = document.createElement("button");
        button.className = "delete";
        li.appendChild(button);
        let icon = document.createElement("i");
        icon.className = "fa-solid fa-x";
        button.appendChild(icon);

        notification.classList.add("right-0", "gr")
        notification.innerHTML = `
        todo elave olundu :\n <b> ${create_todos}</b>
        <div class="icon green">
            <i class="fa-solid fa-check"></i>
        </div>`
        setTimeout(() => {
            notification.classList.remove("right-0", "gr")
            notification.innerHTML = ''
        }, 1500);
        $(button).on("click", function () {
            const data = JSON.parse(localStorage.getItem("todos"))
            let deletedLi = data.map(item => {
                if (item.id == li.getAttribute("key")) {
                    li?.classList?.add(item.delete && 'trash');
                    return {
                        ...item,
                        delete: !item.delete,
                    }
                }
                return item
            })
            localStorage.setItem("todos", JSON.stringify(deletedLi))
            todosLeft.innerHTML = `Items : ${todoListArray.length}`
            li.classList.add("trash")
            notification.classList.add("right-0", "rd")
            notification.innerHTML = `
            todo zibil qutusuna gonderildi 
            <div class="icon red">
                <i class="fa-solid fa-trash"></i>
            </div>`
            setTimeout(() => {
                notification.classList.remove("right-0", "rd")
                notification.innerHTML = ''
            }, 1500);
        });
        $(checkbox).on('change', function () {
            if ($(this).is(":checked")) {
                $(this).closest('li').addClass("completed");
                checkbox.checked = true;

            } else {
                $(this).closest('li').removeClass("completed");
                checkbox.checked = false
            }
        });

        checkbox.addEventListener("click", e => {
            h3.classList.toggle('textLine')
            button.classList.toggle('d-none')
            li.classList.toggle('completed')
            const data = JSON.parse(localStorage.getItem("todos"))
            let newData = data.map(item => {
                if (item.id == li.getAttribute("key")) {
                    return {
                        ...item,
                        completed: !item.completed,
                    }
                }
                return item
            })
            localStorage.setItem("todos", JSON.stringify(newData))
        })


        saveTodo(create_todos)
        todosLeft.innerHTML = `Items : ${todoListArray.length}`
        create_todo.value = ''
    }
}

function loadTodoListFromLocalStorage() {
    const storedData = localStorage.getItem('todos');

    if (storedData) {
        const todoItems = JSON.parse(storedData)
        todoItems.forEach((todo) => {
            let li = document.createElement("li");
            li?.classList?.add('todo_lists_li', `${todo.completed && 'completed'}`);
            li.setAttribute("draggable", "true")
            li.setAttribute("key", todo.id)
            todo_lists.appendChild(li);
            let div = document.createElement("div");
            li.appendChild(div);
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            if (todo.completed) {
                checkbox.checked = true
            }
            if (todo.delete === true) {
                console.log('true')
                li.classList.add("trash")
            } else {
                console.log('false')
                li.classList.remove("trash")
            }
            div.appendChild(checkbox);
            let h3 = document.createElement("h3");
            h3.classList.add(`${todo.completed && 'textLine'}`)
            h3.innerHTML = todo.text;
            div.appendChild(h3);
            let button = document.createElement("button");
            button.className = `delete ${todo.completed && 'd-none'}`;
            li.appendChild(button);
            let icon = document.createElement("i");
            icon.className = "fa-solid fa-x";
            button.appendChild(icon);
            checkbox.addEventListener("click", e => {
                h3.classList.toggle('textLine')
                button.classList.toggle('d-none')
                li.classList.toggle('completed')
                const data = JSON.parse(localStorage.getItem("todos"))
                let newData = data.map(item => {
                    if (item.id == li.getAttribute("key")) {
                        return {
                            ...item,
                            completed: !item.completed,
                        }
                    }
                    return item
                })
                localStorage.setItem("todos", JSON.stringify(newData))
            })
            $(button).on("click", function () {
                const data = JSON.parse(localStorage.getItem("todos"))
                let deletedLi = data.map(item => {
                    if (item.id == li.getAttribute("key")) {
                        li?.classList?.add(item.delete && 'trash');
                        return {
                            ...item,
                            delete: !item.delete,
                        }
                    }
                    return item
                })
                localStorage.setItem("todos", JSON.stringify(deletedLi))
                li.classList.add("trash")
                notification.classList.add("right-0", "rd")
                notification.innerHTML = `
                todo silindi 
                <div class="icon red">
                    <i class="fa-solid fa-trash"></i>
                </div>`
                setTimeout(() => {
                    notification.classList.remove("right-0", "rd")
                    notification.innerHTML = ''
                }, 1500);
                todosLeft.innerHTML = `Items : ${todoListArray.length}`
            })
            $('.restore').on("click", function () {
                $(this).parent().fadeOut(700, function () {
                    li.parentNode.removeChild(li);
                });
                let fulldeletedLi = document.querySelectorAll(".todo_lists_li")
                fulldeletedLi.forEach(item => {
                    item.classList.remove("trash");
                });

                const data = JSON.parse(localStorage.getItem("todos"))
                let deletedLi = data.map(item => {
                    if (item.id == li.getAttribute("key")) {
                        return {
                            ...item,
                            delete: !item.delete,
                        }
                    }
                    return item
                })
                localStorage.setItem("todos", JSON.stringify(deletedLi))
                todoback = deletedLi
            })

            todo_lists.prepend(li);
            todosLeft.innerHTML = `Items : ${todoListArray.length}`;
        });
    }
}
loadTodoListFromLocalStorage()
let deletedUl = document.querySelector(".deleted-all")
let category = document.querySelectorAll('.choice p');
let todoLi = document.querySelectorAll(".todocoll");
category.forEach(element => {
    element.addEventListener("click", () => {
        category.forEach(item => {
            item.classList.remove("actived")
        })
        element.classList.add("actived");
    })
})

$(document).on('click', '[data-filter="all"]', function () {
    let allLi = document.querySelectorAll(".todo_lists_li");
    allLi.forEach(elem => {
        if (elem?.classList?.contains("todo_lists_li")) {
            $(".todo_lists li").css({
                display: "flex"
            })
        }
    })
    deletedUl.classList.remove("active")
})

$(document).on("click", '[data-filter="active"]', function () {
    let allLi = document.querySelectorAll(".todo_lists_li");
    allLi.forEach(elem => {
        if (elem?.classList?.contains("completed")) {
            $(".todo_lists li.completed").css({
                display: "none"
            })
            $(".todo_lists li:not(.completed)").css({
                display: "flex"
            })

        }
    })
    deletedUl.classList.remove("active")
})

$(document).on("click", '[data-clear="clear"]', function () {
    let allLi = document.querySelectorAll(".todo_lists_li");
    allLi.forEach(elem => {
        if (elem?.classList?.contains("completed")) {
            elem.remove();
            notification.classList.add("right-0", "rd")
            notification.innerHTML = `
            secilmis todo silindi 
            <div class="icon red">
                <i class="fa-solid fa-trash"></i>
            </div>`

            removeTodoFromLocalStorage(Number(elem.getAttribute("key")))
            let delLi = document.querySelectorAll("li:not(.completed)")
            todosLeft.innerHTML = `Items : ${todoListArray.length}`
            setTimeout(() => {
                notification.classList.remove("right-0", "rd")
                notification.innerHTML = ''
            }, 1500);
        }
    })
    deletedUl.classList.remove("active")
})

$(document).on("click", '[data-filter="completed"]', function () {
    let allLi = document.querySelectorAll(".todo_lists_li");
    allLi.forEach(elem => {
        if (!elem?.classList?.contains("completed")) {
            $(".todo_lists li:not(.completed)").css({
                display: "none"
            })
            $(".todo_lists li.completed").css({
                display: "flex"
            })
        }
    })
    deletedUl.classList.remove("active")
})
$(document).on("click", '[data-filter="trash"]', function () {
    deletedUl.classList.add("active")
    overlay.classList.add("active")
    const storedData = localStorage.getItem('todos');
    if (storedData) {
        const todoItems = JSON.parse(storedData).filter(item => item.delete != false);
        todoItems.forEach((todo) => {
            let li = document.createElement("li");
            li?.classList?.add('todod_lists_li');
            li.setAttribute("key", todo.id)
            deletedList.appendChild(li);
            let div = document.createElement("div");
            li.appendChild(div);
            li.setAttribute("draggable", "true")
            let h3 = document.createElement("h3");
            h3.classList.add(`${todo.completed && 'textLine'}`)
            h3.innerHTML = todo.text;
            div.appendChild(h3);
            let restore = document.createElement("button");
            restore.className = `restore`;
            li.appendChild(restore);
            let icon = document.createElement("i");
            icon.className = "fa-solid fa-rotate-left";
            restore.appendChild(icon);
            let trash = document.createElement("i");
            let buttonTrash = document.createElement("button");
            buttonTrash.classList.add("trash-btn")
            trash.classList.add("fa-solid", "fa-trash")
            trash.classList.add("trash-btn-i")
            buttonTrash.appendChild(trash)
            li.appendChild(buttonTrash)
            $(buttonTrash).on("click", function () {
                $(this).parent().fadeOut(700, function () {
                    li.parentNode.removeChild(li);
                });
                removeTodoFromLocalStorage(Number(li.getAttribute("key")))
                const itemKey = Number(li.getAttribute("key"));

                // Seçilen öğeyi ve aynı key değerine sahip diğer öğeleri seçin ve onları silin
                const itemsToDelete = document.querySelectorAll(`.todo_lists_li[key="${itemKey}"]`);

                itemsToDelete.forEach(item => {
                    item.parentNode.removeChild(item);
                    removeTodoFromLocalStorage(Number(item.getAttribute("key")));
                });
                todosLeft.innerHTML = `Items : ${todoListArray.length}`
                notification.classList.add("right-0", "rd")
                notification.innerHTML = `
                todo zibil qutusuna gonderildi 
                <div class="icon red">
                    <i class="fa-solid fa-trash"></i>
                </div>`
                setTimeout(() => {
                    notification.classList.remove("right-0", "rd")
                    notification.innerHTML = ''
                }, 1500);
            });
            $(restore).on("click", function () {
                $(this).parent().fadeOut(700, function () {
                    li.parentNode.removeChild(li);
                });
                let fulldeletedLi = document.querySelectorAll(".todo_lists_li")
                fulldeletedLi.forEach(item => {
                    item.classList.remove("trash");
                });

                const data = JSON.parse(localStorage.getItem("todos"))
                let deletedLi = data.map(item => {
                    if (item.id == li.getAttribute("key")) {
                        return {
                            ...item,
                            delete: !item.delete,
                        }
                    }
                    return item
                })
                localStorage.setItem("todos", JSON.stringify(deletedLi))
                todoback = deletedLi
            })


        })
    }
})



$(document).on("click", '.close', function () {
    deletedUl.classList.remove("active")
    overlay.classList.remove("active")
})

function toggleTheme() {
    if (localStorage.getItem("body-theme") !== null) {
        if (localStorage.getItem("body-theme") === "dark") {
            $("body").addClass("dark");
        } else {
            $("body").removeClass("dark");
        }
    }
    uptadeImages();
}
toggleTheme();

$(".toggle-theme").on("click", function () {
    $("body").toggleClass("dark");
    if ($("body").hasClass("dark")) {
        localStorage.setItem("body-theme", "dark");
    } else {
        localStorage.setItem("body-theme", "light");
    }
    uptadeImages();
})

function uptadeImages() {
    if ($("body").hasClass("dark")) {
        $(".toggle-theme img").attr("src", "./images/icon-sun.svg");
        $(".main-img").attr("src", "images/bg-desktop-dark.jpg");
    } else {
        $(".toggle-theme img").attr("src", "./images/icon-moon.svg");
        $(".main-img").attr("src", "images/bg-desktop-light.jpg");
    }
}

