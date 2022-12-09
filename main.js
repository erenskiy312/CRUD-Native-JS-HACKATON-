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

//! Открытие модального окна для публикации поста
btnShare.addEventListener("click", async function () {
  modal.style.display = "block";
});

//! Закрытие модального окна
btnCancel.addEventListener("click", async function () {
  modal.style.display = "none";
});

//! Навешиваем слушатель событий на кнопку добавления поста
btnPublish.addEventListener("click", async function () {
  let obj = {
    inpSign: inpSign.value,
    inpImage: inpImage.value,
  };

  if (!obj.inpSign.trim() || !obj.inpImage.trim()) {
    alert("Заполните все поля!");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8 " },
    body: JSON.stringify(obj),
  });

  inpSign.value = "";
  inpImage.value = "";

  modal.style.display = "none";
  render();
});

//! Отображение постов
render();
async function render() {
  let publications = await fetch(`${API}?q=${searchVal}`)
    .then((res) => res.json())
    .catch((err) => err);

  list.innerHTML = "";

  publications.forEach((elem) => {
    let newElem = document.createElement("div");
    newElem.id = elem.id;
    newElem.innerHTML = ` <div class="card">
        <img class="post_avatar" src="./img/user.png" alt=""> <strong>user123</strong>
        <img class="post_picture" src="${elem.inpImage}" alt="">
        <div>
        <a href="#"><i class="fa-solid fa-heart"></i>0</a>
        <a href="#"><i class="fa-regular fa-comment"></i> </a>
        <a href="#"><i class="fa-regular fa-paper-plane"></i></a>
        <a href="#"><i class="fa-solid fa-bookmark"></i>0</a>
    </div>
        <strong>user123</strong>  <span class="post_sign">${elem.inpSign}</span>
        <button class="btn_delete" id="${elem.id}">Удалить</button>
        <button class="btn_edit"  id="${elem.id}">Редакт...</button>   

</div>`;
    list.append(newElem);
  });
}

//! Редактирование поста

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("btn_edit")) {
    editModal.style.display = "block";
    let id = e.target.id;

    await fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        inpEditSign.value = data.inpSign;
        inpEditImage.value = data.inpImage;
        btnSave.setAttribute("id", data.id);
      });
  }
});

btnSave.addEventListener("click", function () {
  let id = this.id;

  let inpSign = inpEditSign.value;
  let inpImage = inpEditImage.value;

  if (!inpSign || !inpImage) return;

  let editedPost = {
    inpSign: inpSign,
    inpImage: inpImage,
  };

  editModal.style.display = "none";
  saveEdit(editedPost, id);
});

//! функция для сохранения изменений
async function saveEdit(editedPost, id) {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(editedPost),
  }).then(() => render());

  //? вызов функции render для отображения обновленных данных
  render();
}
//! Слушатель событий для кнопки отмены
btnEditCancel.addEventListener("click", async function () {
  editModal.style.display = "none";
});

//! Слушатель событий для удаления поста
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("btn_delete")) {
    let id = e.target.id;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => render());
  }
});

//! Слушатель событий для поисковика
search.addEventListener("input", () => {
  searchVal = search.value;
  render();
});
