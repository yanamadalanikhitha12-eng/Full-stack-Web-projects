$(document).ready(function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    function renderTasks(filter = "all") {
        $("#taskList").empty();
        tasks.forEach((task, index) => {
            if (filter === "completed" && !task.completed) return;
            if (filter === "pending" && task.completed) return;

            let taskItem = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                    <div>
                        <button class="btn btn-sm btn-success complete-btn" data-index="${index}">✔</button>
                        <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">🗑</button>
                    </div>
                </li>
            `;
            $("#taskList").append(taskItem);
        });
    }
    $("#addTaskBtn").click(function () {
        let taskText = $("#taskInput").val().trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            $("#taskInput").val("");
        }
    });
    $(document).on("click", ".complete-btn", function () {
        let index = $(this).data("index");
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    });
    $(document).on("click", ".delete-btn", function () {
        let index = $(this).data("index");
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    });

    $(".filter-btn").click(function () {
        let filter = $(this).data("filter");
        renderTasks(filter);
    });

    renderTasks();
});
