class Ingredients {
  constructor(ingredient, quantity){
    this.ingredient = ingredient;
    this.quantity = quantity;
  }
}

class UI {

  static displayIngredients() {

    const lists = [ {
      ingredient: "apple",
      quantity: "3"
    },
    {
      ingredient: "apple",
      quantity: "3"
    }
    ];

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

  static deleteList(){

  }
}

document.querySelector("#ingredient-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const ingredient = document.querySelector("#ingredient").value;
  const quantity = document.querySelector("#ingredientQty").value;

  if (ingredient === "" || quantity === "") {

  } else {
    const list = new Ingredients(ingredient, quantity);
    UI.addIngredients(list);
  }
});
