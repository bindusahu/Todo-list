
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const resetButton = document.getElementById("reset-button");
const showAllButton = document.getElementById("show-all-button");
const showCompletedButton = document.getElementById("show-completed-button");
const showIncompleteButton = document.getElementById("show-incomplete-button");

function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerText = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        inputBox.value = "";
        saveData();
    }
}


// Event listener to handle "Enter" key press on input-box
document.getElementById("input-box").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveData();
    } else if (event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
        saveData();
    }
}, false);

resetButton.addEventListener("click", function () {
    listContainer.innerHTML = "";
    localStorage.removeItem("data");
});

showAllButton.addEventListener("click", function () {
    showTask();
});

showCompletedButton.addEventListener("click", function () {
    filterTasks(true);
});

showIncompleteButton.addEventListener("click", function () {
    filterTasks(false);
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    if (listContainer.innerHTML === null) {
        listContainer.innerHTML = "";
    }
}

function filterTasks(showCompleted) {
    const tasks = listContainer.children;
    for (let i = 0; i < tasks.length; i++) {
        if (showCompleted) {
            if (tasks[i].classList.contains("checked")) {
                tasks[i].style.display = "block";
            } else {
                tasks[i].style.display = "none";
            }
        } else {
            if (tasks[i].classList.contains("checked")) {
                tasks[i].style.display = "none";
            } else {
                tasks[i].style.display = "block";
            }
        }
    }
}

showTask();

