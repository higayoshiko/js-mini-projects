class Ingredients {
  constructor(ingredient, quantity){
    this.ingredient = ingredient;
    this.quantity = quantity;
  }
}

class UI {

  static displayIngredients() {

    lists.forEach((list) => UI.addIngredients(list));
  }

  static addIngredients(list) {
    const ingredientList = document.querySelector("#ingredient-list");

    const li = document.createElement("li");

    li.innerHTML = `
      ${list.ingredient}
      <span class="badge bg-primary rounded-pill">${list.quantity}</span>
      <a href="#" class="btn btn-danger btn-sm delete">X</a>
    `;

    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    ingredientList.appendChild(li);
  }

  static deleteList(e){
    if(e.classList.contains('delete')){
      e.parentElement.remove();
    }
  }

  static clearFields(){
    document.querySelector("#ingredient").value = "";
    document.querySelector("#ingredientQty").value = "";
  }

  static showAlert(text, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(text));
    const listCtn = document.querySelector(".list-ctn");
    const ingredientList = document.querySelector("#ingredient-list");
    listCtn.insertBefore(div, ingredientList);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }
}

document.querySelector("#ingredient-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const ingredient = document.querySelector("#ingredient").value;
  const quantity = document.querySelector("#ingredientQty").value;

  if (ingredient === "" || quantity === "") {
    UI.showAlert("Fill all fields", "warning");
  } else {
    const list = new Ingredients(ingredient, quantity);
    UI.addIngredients(list);
    UI.clearFields();
    UI.showAlert("added", "success");
  }
});

document.querySelector("#ingredient-list").addEventListener("click", (e) => {
  UI.deleteList(e.target);
  UI.showAlert("removed", "success");
});

const submitForms = function () {
  document.querySelector("#recipes-form").submit();
}
