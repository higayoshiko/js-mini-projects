class Ingredients {
  constructor(ingredient, quantity) {
    this.ingredient = ingredient;
    this.quantity = quantity;
  }
}

class Recipe {
  constructor(name) {
    this.name = name;
  }
}

class UI {
  static displayIngredients() {

    const lists = StoringData.getIngredients();

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

  static deleteList(e) {
    if (e.classList.contains('delete')) {
      e.parentElement.remove();
    }
  }

  static clearIngredientFields() {
    document.querySelector("#ingredient").value = "";
    document.querySelector("#ingredientQty").value = "";
  }

  static showAlert(text, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(text));
    const formsCtn = document.querySelector(".forms-ctn");
    const title = document.querySelector(".title");
    formsCtn.insertBefore(div, title);

    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  // add Recipes
  static displayRecipeName() {
    const names = StoringData.getStoredRecipes();

    names.forEach((name) => UI.addIngredients(name));
  }

  static addRecipe(recipe) {
    const cardCtn = document.querySelector("#card-ctn");
    const cardDiv = document.createElement("div");

    cardDiv.innerHTML = `
    <div class="card-header">${recipe.name}</div>
    <div class="card-body">
      <h4 class="card-title">Ingredients</h4>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Cras justo odio
          <span class="badge bg-primary rounded-pill">14</span>
        </li>
      </ul>
    </div>
    `;

    cardDiv.classList.add("card", "text-white", "bg-primary", "mb-3");
    cardDiv.style.maxWidth = "20rem";
    cardCtn.appendChild(cardDiv);
  }

  static clearRecipeFields() {
    document.querySelector("#meal-name").value = "";
  }
}

class StoringData {

  static getIngredients() {
    let storedIngredients;
    if (localStorage.getItem("ingredients") === null) {
      storedIngredients = [];
    } else {
      storedIngredients = JSON.parse(localStorage.getItem("ingredients"));
    }
    return storedIngredients;
  }

  static addIngredients(ingredient) {
    const ingredients = StoringData.getIngredients();
    ingredients.push(ingredient);

    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }

  static getStoredRecipes() {
    let storedRecipes;
    if (localStorage.getItem("recipes") === null) {
      storedRecipes = [];
    } else {
      storedRecipes = JSON.parse(localStorage.getItem("recipes"));
    }
    return storedRecipes;
  }

  static addToMyRecipes(name) {
    const recipes = StoringData.getStoredRecipes();
    recipes.push(name);

    localStorage.setItem("recipes", JSON.stringify(recipes));
  }
}

document.addEventListener("DOMContentLoaded", UI.displayIngredients);

document.querySelector("#ingredient-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const ingredient = document.querySelector("#ingredient").value;
  const quantity = document.querySelector("#ingredientQty").value;

  if (ingredient === "" || quantity === "") {
    UI.showAlert("Fill all fields", "warning");
  } else {
    const list = new Ingredients(ingredient, quantity);
    UI.addIngredients(list);
    StoringData.addIngredients(list);
    UI.clearIngredientFields();
    UI.showAlert("added", "success");
  }
});

document.querySelector("#ingredient-list").addEventListener("click", (e) => {
  UI.deleteList(e.target);
  UI.showAlert("removed", "success");
});

document.querySelector("#recipes-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const mealName = document.querySelector("#meal-name").value;

  if (mealName === "") {
    UI.showAlert("fill in all fields", "warning");
  } else {
    const recipeName = new Recipe(mealName);
    UI.addRecipe(recipeName);
    StoringData.addToMyRecipes(recipeName);
    UI.clearRecipeFields();
  }

});

// const submitForms = function () {
//   document.querySelector("#recipes-form").submit();
// }
