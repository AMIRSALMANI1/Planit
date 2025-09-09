"use strice";

// sidebor  menu
function toggleMenu(id) {
  const arrow = document.getElementById("arrow-" + id);
  const submenu = document.getElementById(id);
  submenu.classList.toggle("open");
  arrow.classList.toggle("rotate");
}
