"use strict";

const login = document.querySelector(".singa");
const sing = document.querySelector(".logina");
const sectionLogin = document.querySelector(".loginsec");
const sectionSing = document.querySelector(".singinsec");

sing.addEventListener("click", function () {
  sectionSing.classList.remove("active");
  sectionLogin.classList.add("active");
});

login.addEventListener("click", function () {
  sectionSing.classList.add("active");
  sectionLogin.classList.remove("active");
});
