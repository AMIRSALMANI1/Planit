"use strice";
import { createTodo, getTodos } from "../js/api.js";
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
//  btn add column
plus.forEach((item) => {
  item.addEventListener("click", () => {
    containerColumn = item.closest(".sections");
    containerModal.classList.toggle("active-input");

  });
});
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

// date persian
const now = new Date();
const option = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};
const persianDate = new Intl.DateTimeFormat("fa-IR", option).format(now);

// btn add modal
addTodoBtn.addEventListener("click", async () => {
  const title = inputName.value.trim();
  const desc = inputDesc.value.trim();
  if (!title) return;
  const newTodo = {
    title: title,
    discription: desc,
    status: containerColumn,
    createdAt: new Date(),
  };
  const result = await createTodo(newTodo);
  updateUI();
  // addTodoFun(titel, desc);
  // drag and drop
});
// delete item
document.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-todo-icon");
  if (!deleteBtn) return;
  const card = deleteBtn.parentElement.parentElement.parentElement;
  if (!card) return;

  card.remove();
});

// add todo html
const addTodoFun = function (titel, desc, status) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("item", "container-planning");
  todoDiv.setAttribute("draggable", "true");
  dragAndDrop(todoDiv);

  todoDiv.innerHTML = `       
  <!-- ${titel} -->

  <!-- button -->
  <div class = 'container-icon-todo'>
  <div class="planning-cont">${titel}</div>
    <div class="icons-todo">
      <i class="ri-close-circle-line delete-todo-icon"></i>
      <i class="ri-edit-line edite-todo-icon"></i>
    </div>
</div>
  <div class="cont-text-todo">
  <p>بروز رسانی فهرست نیازمندی ها</p>
  <p class="create">${desc}</p>
  <div class="date">${persianDate}</div>
  `;
  
  switch (status) {
    case "doing":
      containerColumn = document.querySelector(`[data-status="${status}"]`);
      break;
    case "do":
      containerColumn = document.querySelector(`[data-status="${status}"]`);
      break;
    case "complete":
      containerColumn = document.querySelector(`[data-status="${status}"]`);
      break;
    case "complete":
      containerColumn = document.querySelector(`[data-status="${status}"]`);
      break;
    default:
      break;
  }

  console.log(column);

  containerColumn.querySelector(".container-item").appendChild(todoDiv);
  containerModal.classList.toggle("active-input");
  clearModalInput();
};

// drag and drop
const dragAndDrop = function (todoDiv) {
  todoDiv.addEventListener("dragstart", (e) => {
    let select = e.target;
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
};
// delete all
const closeTodo = document.querySelectorAll(".all-delete");
closeTodo.forEach((item) => {
  item.addEventListener("click", () => {
    const column = item.parentElement.parentElement.parentElement;
    const tasksContainer = column.querySelector(".container-item");
    tasksContainer.innerHTML = "";
  });
});
// clear input modal
const clearModalInput = function () {
  inputDesc.value = "";
  inputName.value = "";
};

// update ui
async function updateUI() {
  const dataTodos = await getTodos();

  for (let i = 0; i < dataTodos.length; i++) {
    const todo = dataTodos[i];
    addTodoFun(todo.title, todo.discription, todo.status);
  }
}
updateUI();
// Delete todo

// API
// get api
