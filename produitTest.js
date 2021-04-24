// window.addEventListener("DOMContentLoaded", fn)

// Split code into functions that have own responsabilities
// Avoid side effects into same function

// Récupération de la chaine de requête dans l'URL
const queryString = new URLSearchParams(window.location.search);
// Récupération uniquement de l'Id
const teddieId = queryString.get("id");

// Affichage du produit qui a été sélectionné par l'Id

fetch(`http://localhost:3000/api/teddies/${teddieId}`)
  .then((data) => data.json())
  .then((productTeddieSelect) => {
    document.querySelector(".container_product").innerHTML = `
      <li class="teddie_card">
        <img class ="teddie_picture" src="${productTeddieSelect.imageUrl}" />
            <div class="teddie_information">
              <h2 class="teddie_name">${productTeddieSelect.name}</h2>
                  <h3 class="teddie_price">${
                    productTeddieSelect.price / 100
                  } €</h3>
                    <p class="teddie_description">${
                      productTeddieSelect.description
                    }</p>
            </div>      
        <form >
            <label for="product_option">Choisir la couleur</label>
              <select name ="select_option "id="choose_color"></select>
        </form>
        <button id="add_basket" type= "submit">Ajouter au panier</button>      
      </li>
    `;

    //  Gérer les options que l'on présente
    const optionColors = productTeddieSelect.colors;
    let templateOption = [];
    // Création d'une boucle pour afficher les options
    for (let i = 0; i < optionColors.length; i++) {
      templateOption += `<option value="${optionColors[i]}">${optionColors[i]}</option>`;
    }
    // Intégrer les options au contenu HTML
    document.querySelector("#choose_color").innerHTML = templateOption;
    //Selection des options
    const idOption = document.getElementById("choose_color");
    // Récuperation choix de l'utilisateur dans une variable
    const selectColor = idOption.value;
    // --------------------------------------Gestion du panier--------------------------------------//
    // Recupération des données sélectionnées par l'utilisateur + envoie au panier

    // Sélection du bouton
    const btnAddBasket = document.querySelector("#add_basket");

    // Ajouter un évènement au bouton
    btnAddBasket.addEventListener("click", (e) => {
      e.preventDefault();

      // Récupération des valeurs du formulaire
      let productCard = {
        productName: productTeddieSelect.name,
        idSelectedProduct: teddieId,
        productOption: selectColor,
        quantity: 1,
        price: productTeddieSelect.price / 100,
      };
      // --------------------------------------LE LOCAL STORAGE--------------------------------------//
      //Stocker les valeurs du formulaire dans le local storage:
      let saveProductOnLocalStorage = JSON.parse(
        localStorage.getItem("teddyBear")
      ); //=>convertir au format JSON avec la clé teddyBear

      //Création fenêtre de confirmation pour le produit + option sélectionné
      function alertConfirmation() {
        if (
          confirm(
            `Le produit ${productTeddieSelect.name} avec la couleur ${selectColor} a été ajouter au panier`
          )
        ) {
          window.location.href = "panier.html";
        } else {
          window.location.href = "index.html";
        }
      }

      // Fonction permettant d'ajouter un produit sélectionné dans le local storage
      function addProductLocalStorage() {
        saveProductOnLocalStorage.push(productCard);
        localStorage.setItem(
          "teddyBear",
          JSON.stringify(saveProductOnLocalStorage)
        );
      }

      // Création de la condition SI il y a un produit dans le locale storage OU non
      if (saveProductOnLocalStorage) {
        addProductLocalStorage();
        alertConfirmation();
      } else {
        saveProductOnLocalStorage = [];
        addProductLocalStorage();
        alertConfirmation();
      }
    });
  });
