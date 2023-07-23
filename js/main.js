// =====================================
// Start Todo App
// =====================================
window.addEventListener('load', () => {
    let todosArr = JSON.parse(localStorage.getItem('todosArr')) || [];
    let nameInput = document.querySelector('#name');
    let newTask = document.querySelector('#to-do-form');
    // Get User Name Valiue If It In Localstorage
    let userName = localStorage.getItem('userName') || '';
    // Show User Name From Local
    nameInput.value = userName;
    // Set User Name And Store It If It Changed
    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('userName', e.target.value);
    });
    newTask.addEventListener('submit', (e) => {
        // To Stop Send Data While Submit
        e.preventDefault();
        // Check If The Input Value Not Empty
        if (e.target.elements.taskcontent.value !== "" && e.target.elements.category.value !== "") {
                // Create The Task Data
            let todo = {
                content: e.target.elements.taskcontent.value,
                category: e.target.elements.category.value,
                done: false,
                createdAt: new Date().getTime(),
            }
            // Add The Task To The Array Todos
            todosArr.push(todo);
            // Save The Array Into Local
            localStorage.setItem('todosArr', JSON.stringify(todosArr));
            // Reset The Form [Empty It]
            e.target.reset();
            showTasks();
        };
    });
    showTasks();
    
    // Function To Create Tasks And Storage In Local
    function showTasks() {
        let divTasks = document.querySelector('#div-tasks');
        // Clear Todo List
        divTasks.innerHTML = "";
        // Creat The Elements Of Task And Set Classes And Attributes
        todosArr.forEach(todo => {
            let taskItem = document.createElement('div');
            taskItem.classList.add('task', 'betwn-flex');
            let lable = document.createElement('label');
            let inputCheck = document.createElement('input');
            inputCheck.type ='checkbox';
            inputCheck.checked = todo.done;
            let taskText = document.createElement('div');
            taskText.classList.add('task-content');
            taskText.innerHTML = `<input type="text" value="${todo.content}" readonly>`
            let span = document.createElement('span');
            span.classList.add('bubble');

            if (todo.category == 'personal') {
                span.classList.add('personal');
            } else {
                span.classList.add('business');
            };
        
            let actionDiv = document.createElement('div');
            actionDiv.classList.add('actions');
            let btnEdit = document.createElement('button');
            btnEdit.classList.add('edit');
            let editeIcon = document.createElement('i');
            editeIcon.classList.add('material-symbols-outlined');
            editeIcon.innerText = 'border_color';
            let btnDelete = document.createElement('button');
            btnDelete.classList.add('delete');
            let trashIcon = document.createElement('i');
            trashIcon.classList.add('material-symbols-outlined');
            trashIcon.innerText = 'delete';
            btnEdit.appendChild(editeIcon);
            btnDelete.appendChild(trashIcon);
            actionDiv.append(btnEdit , btnDelete);
            lable.append(inputCheck , span);
            taskItem.append(lable , taskText , actionDiv);
            divTasks.appendChild(taskItem);
        
            if (todo.done) {
                taskItem.classList.add('done');
            };
            // Function To Add And Delete Done Class
            inputCheck.addEventListener('click', (e) => {
                todo.done = e.target.checked;
                localStorage.setItem('todosArr', JSON.stringify(todosArr));
                if (todo.done) {
                    taskItem.classList.add('done');
                } else {
                    taskItem.classList.remove('done');
                };
                showTasks();
            });
            // Function To Edite Tha Task
            btnEdit.addEventListener('click', () => {
                let input = taskItem.querySelector('input[type="text"]');
                input.removeAttribute('readonly');
                input.focus();
                input.addEventListener('blur', (e) => {
                    input.setAttribute('readonly', true);
                    todo.content = e.target.value;
                    localStorage.setItem('todosArr', JSON.stringify(todosArr));
                    showTasks();
                });
            });
            // Function To Delete Tha Task
            btnDelete.addEventListener('click', () => {
                todosArr = todosArr.filter(t => t != todo);
                localStorage.setItem('todosArr', JSON.stringify(todosArr));
                showTasks();
            });
        });
    };
});

let clearBtn = document.querySelector(".clear-tasks");
let divTasks = document.querySelector('#div-tasks');
// Function To Clear All Tasks From Page And Local
clearBtn.addEventListener('click', () => {
    localStorage.removeItem("todosArr");  
    divTasks.innerHTML = "";
});
