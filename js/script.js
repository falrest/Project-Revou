
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtn = document.getElementById("Filter");
const deleteAllBtn = document.getElementById("Deleteall");

let tasks = [];
let filterMode = "all"; 

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if (filterMode === "completed") return task.completed;
    if (filterMode === "pending") return !task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4">No tasks found</td></tr>`;
    return;
  }

  filteredTasks.forEach((task, index) => {
    const row = document.createElement("tr");
    row.classList.add("fade-row"); 

    row.innerHTML = `
      <td>${task.text}</td>
      <td>${task.date || "-"}</td>
      <td>
        <span style="color:${task.completed ? 'green' : 'red'}; font-weight:bold;">
          ${task.completed ? "Completed" : "Pending"}
        </span>
      </td>
      <td>
        <button onclick="toggleStatus(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const date = dateInput.value;

  if (text === "") {
    alert("Task tidak boleh kosong!");
    return;
  }

  tasks.push({ text, date, completed: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function toggleFilter() {
  if (filterMode === "all") {
    filterMode = "pending";
    filterBtn.textContent = "SHOW PENDING";
  } else if (filterMode === "pending") {
    filterMode = "completed";
    filterBtn.textContent = "SHOW COMPLETED";
  } else {
    filterMode = "all";
    filterBtn.textContent = "SHOW ALL";
  }
  renderTasks();
}

function deleteAll() {
  if (confirm("Yakin mau hapus semua task?")) {
    tasks = [];
    renderTasks();
  }
}

addBtn.addEventListener("click", addTask);
filterBtn.addEventListener("click", toggleFilter);
deleteAllBtn.addEventListener("click", deleteAll);

taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

const style = document.createElement("style");
style.innerHTML = `
  .fade-row {
    animation: fadeInRow 0.5s ease-in-out;
  }
  @keyframes fadeInRow {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

renderTasks();
