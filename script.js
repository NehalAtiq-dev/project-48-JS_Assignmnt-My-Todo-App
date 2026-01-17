   
let inputText = document.getElementById("inputText");
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todoList");
let deleteAllBtn = document.getElementById("deleteAllBtn");
let editItem = null;

function errorsAlert(icon, title, message) {
    Swal.fire({
    icon: icon,
    title: title,
    text: message,
    confirmButtonColor: '#6c5ce7'
    });
}

function addHandler() {
    let val = inputText.value.trim();

    if (val === "") {
errorsAlert("error", "Error!", "Please enter a task value .");
return;
    }

    if (editItem) {
    editItem.querySelector(".task-text").textContent = val;
    editItem = null;
    addBtn.innerText = "Save";
    inputText.value = "";
    return;
    }
    let li = document.createElement("li");
    li.innerHTML = `
<span class="task-text">${val}</span>
<div class="task-actions">
    <button class="action-btn edit-btn" onclick="editHandler(this)">Edit</button>
    <button class="action-btn del-btn" onclick="deleteHandler(this)">Delete</button>
</div>
    `;
    
    todoList.appendChild(li);
    inputText.value = "";
}

function editHandler(element) {
    editItem = element.parentElement.parentElement;
    inputText.value = editItem.querySelector(".task-text").textContent;
    addBtn.innerText = "Update"; 
    inputText.focus();
}

function deleteHandler(element) {
    element.parentElement.parentElement.remove();
}

function deleteAllHandler() {
    if (todoList.children.length === 0) {
errorsAlert("info", "Error", "Nothing to delete!");
return;
    }

    while (todoList.firstChild) {
todoList.removeChild(todoList.firstChild);
    }
    errorsAlert("success", "Cleared!", "All tasks deleted.");
}

addBtn.addEventListener("click", addHandler);
deleteAllBtn.addEventListener("click", deleteAllHandler);

inputText.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addHandler();
});