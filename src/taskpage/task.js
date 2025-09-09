"use strice";

// sidebor  menu
function toggleMenu(id) {
  const arrow = document.getElementById("arrow-" + id);
  const submenu = document.getElementById(id);
  submenu.classList.toggle("open");
  arrow.classList.toggle("rotate");
}

// drag & drop
const items = document.querySelectorAll(".item");
const backLog = document.querySelector(".backlog");
const toDo = document.querySelector(".todo-task");
const inrPogress = document.querySelector(".in-progress");
const review = document.querySelector(".review");

// section add todo

// open ond close
const closeBtn = document.querySelector(".icon-input");
const addTodo = document.querySelector(".add-task-btn");
const containerModal = document.querySelector(".input-cont");
// inputs
const inputName = document.getElementById("input-modal-name");
const inputDesc = document.getElementById("input-modal-desc");
const addTodoBtn = document.getElementById("add-todo-btn");
// items
const plus = document.querySelectorAll(".plus");
// var container
let containerColumn = null;

// close modal
closeBtn.addEventListener("click", () => {
  containerModal.classList.remove("active-input");
  clearModalInput();
});

// close with click window
window.addEventListener("click", (e) => {
  if (e.target === containerModal) {
    containerModal.classList.remove("active-input");
    clearModalInput();
  }
});

// add modal
addTodo.addEventListener("click", () => {
  containerModal.classList.add("active-input");
});

//  btn add column
plus.forEach((item) => {
  item.addEventListener("click", () => {
    containerColumn = item.closest(".sections");
    containerModal.classList.toggle("active-input");
  });
});

// date persian
const now = new Date();
const option = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};
const persianDate = new Intl.DateTimeFormat("fa-IR", option).format(now);

// btn add modal
addTodoBtn.addEventListener("click", () => {
  const titel = inputName.value.trim();
  const desc = inputDesc.value.trim();
  if (!titel) return;

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("item", "container-planning");
  todoDiv.setAttribute("draggable", "true");

  // drag and drop
  todoDiv.addEventListener("dragstart", (e) => {
    let select = e.target;
    console.log(e.target);
    backLog.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    backLog.addEventListener("drop", () => {
      backLog.appendChild(select);
      select = null;
    });

    toDo.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    toDo.addEventListener("drop", () => {
      toDo.appendChild(select);
      select = null;
    });

    inrPogress.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    inrPogress.addEventListener("drop", () => {
      inrPogress.appendChild(select);
      select = null;
    });

    review.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    review.addEventListener("drop", () => {
      review.appendChild(select);
      select = null;
    });
  });
  todoDiv.innerHTML = `       
  <!-- ${titel} -->

  <!-- button -->
  <div class="planning-cont">${titel}</div>
  <div class="cont-text-todo">
  <p>بروز رسانی فهرست نیازمندی ها</p>
  <p class="create">${desc}</p>
  <div class="date">${persianDate}</div>
  `;
  // console.log(todoDiv);

  containerColumn.querySelector(".container-item").appendChild(todoDiv);
  containerModal.classList.toggle("active-input");
  clearModalInput();
});

// clear input modal
const clearModalInput = function () {
  inputDesc.value = "";
  inputName.value = "";
};

// API
// get api
const API_BASE = "https://68b9c31b6aaf059a5b58b010.mockapi.io";

async function fetchTasks() {
  try {
    const res = await fetch(`${API_BASE}/task`);
    if (!res.ok) throw new Error("HTTP" + res.status);
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    console.error("خطا در fetchTask:", err);
  }
}

async function addTasks(title, description, status = "backLog") {
  const payload = {
    title,
    description,
    status,
    createdAt: new Date().toISOString(),
  };
  try {
    const res = await fetch(`${API_BASE}/task`, {
      method: "post",
      headers: { "Content-Type": " appliction/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("HTTP", res.status);
    await fetchTasks();
    inputName.value = "";
    inputDesc.value = "";
  } catch (err) {
    console.error("خطا در addTask", err);
    alert("خطا در ایجاد تسک");
  }
}

async function updateTask(id, fields) {
  try {
    const res = await fetch(`${API_BASE}/task/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    if (!res.ok) throw new Error("HTTP" + res.status);
    await fetchTasks();
  } catch (err) {
    console.err();
    alert("خطا در بروزرسانی تسک: " + err.message);
  }
}

async function deleteTask(id) {
  if (!confirm("ایا برای حذف مطمئن هستید")) return;
  try {
    const res = await fetch(`${API_BASE}/task/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("HTTP" + res.status);
    await fetchTasks();
  } catch (err) {
    console.error("خطا در deleteTask:", err);
    alert("خطا در حذف تسک: " + err.message);
  }
}

const backlogDrop = document.getElementById("backlog-drop");
const inProgresDrop = document.getElementById("in-progress-drop");
const reviewDrop = document.getElementById("review-drop");
const todoDrop = document.getElementById("todo-drop");
function clearColumns() {
  backlogDrop.innerHTML = "";
  inProgresDrop.innerHTML = "";
  todoDrop.innerHTML = "";
  reviewDrop.innerHTML = "";
}

function createTaskCard(task) {
  const el = document.createElement("div");
  el.className = "task-card";
  el.dataset.id = task.id;

  const title = document.createElement("div");
  title.className = "task-title";
  title.textContent = task.description;
  el.appendChild(title);

  if (task.description) {
    const desc = document.createElement("div");
    desc.className = "task-desc";
    desc.textContent = task.description;
    el.appendChild;
  }

  const meta = document.createElement("div");
  meta.className = "task-meta";
  meta.innerHTML = `<small>${
    task.createdAt ? new Date(task.createdAt).toLocaleString() : ""
  }</small>`;
  const delBtn = document.createElement("button");
  delBtn.className = "task-delete";
  delBtn.textContent = "×";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  });
  meta.appendChild(delBtn);
  el.appendChild(meta);

  // double-click برای جابجایی ساده بین وضعیت‌ها (مثال: backlog -> todo -> in-progress -> review)
  el.addEventListener("dblclick", () => {
    const order = ["backlog", "todo", "in-progress", "review"];
    const idx = order.indexOf(task.status);
    const next = order[(idx + 1) % order.length];
    updateTask(task.id, { status: next });
  });

  return el;
}

function renderTasks(tasks) {
  clearColumns();
  // مرتب سازی بر اساس createdAt (اختیاری)
  tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  tasks.forEach(task => {
    const card = createTaskCard(task);
    switch (task.status) {
      case "backlog":
        backlogDrop.appendChild(card);
        break;
      case "todo":
        if (todoDrop) todoDrop.appendChild(card);
        else backlogDrop.appendChild(card);
        break;
      case "in-progress":
        inProgresDrop.appendChild(card);
        break;
      case "review":
        reviewDrop.appendChild(card);
        break;
      default:
        backlogDrop.appendChild(card);
    }
  });
}

// === هندلرهای UI ===
// if (addTodoBtn) {
//   addTodoBtn.addEventListener("click", () => {
//     const t = inputName.value.trim();
//     const d = inputDesc.value.trim();
//     if (!t) return alert("عنوان را وارد کنید");
//     addTasks(t, d, "backlog");
//   });
// }


// باز/بسته کردن فرم ساده
if (addTodoBtn && inputCont) {
  addTodoBtn.addEventListener("click", () => {
    inputCont.style.display = inputCont.style.display === "block" ? "none" : "block";
  });
}

// لود اولیه
document.addEventListener("DOMContentLoaded", fetchTasks);

const plusButtons = document.querySelectorAll(".plus");

plusButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // ستون والد رو پیدا کن
    const section = btn.closest(".sections");
    let status = "backlog"; // پیش‌فرض

    if (section.classList.contains("backlog")) status = "backlog";
    else if (section.classList.contains("todo-task")) status = "todo";
    else if (section.classList.contains("in-progress")) status = "in-progress";
    else if (section.classList.contains("review")) status = "review";

    const title = prompt("عنوان فعالیت:");
    if (title) {
      addTasks(title, "", status);
    }
  });
});