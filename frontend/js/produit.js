// **************************************************VARIABLE**************************************************\\
// Adress URL de base
const BASE_URL = "http://localhost:3000/api";

// *********************************************FONCTION CHARGEMENT*********************************************\\
window.addEventListener("DOMContentLoaded", () => {
  productApp();
});

// *********************************************FONCTIONS PRINCIPALES*********************************************\\
function productApp() {
  // Récupération de la chaine de requête dans l'URL
  const queryString = new URLSearchParams(window.location.search);
  // Extraire uniquement l'Id
  const teddieId = queryString.get("id");

  // Appel de l' API (en fonction du produit choisi)
  fetch(`${BASE_URL}/teddies/${teddieId}`)
    .then((data) => data.json())
    .catch((error) => console.log(error.message))
    .then((data) => {
      if (data) {
        showTeddie(data);
        teddieOption(data);
        const btnAddBasket = document.querySelector("#add_basket");
        btnAddBasket.addEventListener("click", (e) => {
          e.preventDefault();
          addBasket(data);
        });
      }
    });
}

// Fonction pour choisir l'option du produit
function getSelectedColor() {
  const idOption = document.querySelector("#choose_color");
  // Récuperation choix de l'utilisateur dans une variable
  if (idOption) {
    return idOption.value;
  }
}

// Fonction pour ajouter le produit au panier
function addBasket(productTeddieSelect) {
  const selectColor = getSelectedColor();
  // Récupération des valeurs du formulaire
  const productCard = {
    name: productTeddieSelect.name,
    id: productTeddieSelect._id,
    option: selectColor,
    quantity: 1,
    price: productTeddieSelect.price / 100,
  };
  addProductLocalStorage(productCard);
  alertConfirmation(productCard);
}

// Fonction permettant d'ajouter un produit sélectionné dans le local storage
function addProductLocalStorage(productCard) {
  //Stocker les valeurs du formulaire dans le local storage:
  // Création de la condition SI il y a un produit dans le locale storage OU non
  let saveProductOnLocalStorage =
    JSON.parse(localStorage.getItem("product")) || []; //=>convertir au format JSON avec la clé teddyBear
  saveProductOnLocalStorage.push(productCard);
  localStorage.setItem("product", JSON.stringify(saveProductOnLocalStorage));
}

//Fonction message de confirmation selection produit + option sélectionné
function alertConfirmation(productCard) {
  if (productCard) {
    try {
      alert(
        `Le produit ${productCard.name} avec la couleur ${productCard.option} a été ajouter au panier`
      );
      // window.location.href = "panier.html";
    } catch (error) {
      console.log(error.message);
    }
  }
}

// Fonction pour afficher le produit selectionné
function showTeddie(teddiesData) {
  document.querySelector(".container_product").innerHTML = `
    <div class="teddie_card">
      <img class ="teddie_picture" src="${teddiesData.imageUrl}" />
          <div class="teddie_information">
            <h2 class="teddie_name">${teddiesData.name}</h2>
                <h3 class="teddie_price">${teddiesData.price / 100} €</h3>
                  <p class="teddie_description">${teddiesData.description}</p>
          </div>      
      <form >
          <label for="product_option">Choisir la couleur</label>
            <select name ="select_option" id="choose_color"></select>

            <label for="product_quantity">Choisir la quantité</label>
            <select name ="select_quantity "id="choose_quantity"></select>
      </form>
      <button id="add_basket" type= "submit">Ajouter au panier</button>      
    </div>
  `;
}

// Options couleurs de chaque produit
function teddieOption(teddiesData) {
  const optionColors = teddiesData.colors;
  let optionArray = [];
  if (Array.isArray(optionColors)) {
    optionColors.forEach((color) => {
      optionArray += `<option value="${color}"> ${color} </option>`;
    });
  }

  const option = document.querySelector("#choose_color");
  if (option) {
    option.innerHTML = optionArray;
  }
}
