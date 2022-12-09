const API = "http://localhost:8002/publications";
//! вытаскиваем элементы
let inpSearch = document.querySelector(".navbar_input");
let btnShare = document.querySelector(".share");
let modal = document.querySelector(".main_modal");
let btnCancel = document.querySelector(".cancel");
let inpSign = document.querySelector(".sign");
let inpImage = document.querySelector(".image");
let btnPublish = document.querySelector(".publish");
let list = document.querySelector(".post-list");

//! элементы для редактирования
let editModal = document.querySelector(".edit-main_modal");
let btnEditCancel = document.querySelector(".edit-cancel");
let inpEditSign = document.querySelector(".edit-sign");
let inpEditImage = document.querySelector(".edit-image");
let btnSave = document.querySelector(".edit-save");

//! Элементы для поисковика
let search = document.querySelector(".navbar_input");
let searchVal = "";
