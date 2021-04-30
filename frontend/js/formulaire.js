// **************************************************VARIABLE**************************************************\\
let productLocalStorage = JSON.parse(localStorage.getItem("product"));

const btnSendForm = document.querySelector("#send_form");
const form = document.querySelector("#array_form");
let products = [];

// *********************************************FONCTIONS PRINCIPALES*********************************************\\

// Ecoute des évènement au clique du bouton
btnSendForm.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  // Récupération valeurs du formulaire dans une constante
  const contact = {
    firstName: document.querySelector("#first_name").value,
    lastName: document.querySelector("#last_name").value,
    address: document.querySelector("#adress").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#e_mail").value,
  };

  //Récupération données saisies par l'utilisateur pour les controlés
  const firstNameUser = contact.firstName;
  const lastNameUser = contact.lastName;
  const adressUser = contact.adress;
  const cityUser = contact.city;
  const emailUser = contact.email;
  // const zipCodeUser = formValues.zip_code;

  //Déclaration des Regexp pour controler le formulaire
  // Prénom , Nom , Ville
  const regexFormValues = (value) => {
    return /^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$/.test(value);
  };
  // Code Postal
  // const regexZipCodeValue = (value) => {
  //   return /^[0-9]{5}$/.test(value);
  // };
  //Adresse
  const regexAdressValue = (value) => {
    return /^([0-9a-zA-Z,\.]*)?([0-9]{5})?([a-zA-Z])$/gm.test(value);
  };
  //Email
  const regexEmailValue = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  //Condition si données sont correctes
  function firstNameControl() {
    if (regexFormValues(firstNameUser)) {
      return true;
    } else {
      alert(textAlert("PRENOM"));
      return false;
    }
  }

  function lastNameControl() {
    if (regexFormValues(lastNameUser)) {
      return true;
    } else {
      alert(textAlert("NOM"));
      return false;
    }
  }

  function adressControl() {
    if (regexAdressValue(adressUser)) {
      return true;
    } else {
      alert(textAlert("ADRESSE"));
      return false;
    }
  }

  function cityControl() {
    if (regexFormValues(cityUser)) {
      return true;
    } else {
      alert(textAlert("VILLE"));
      return false;
    }
  }

  function zipCodeControl() {
    if (regexZipCodeValue(zipCodeUser)) {
      return true;
    } else {
      alert("CODE POSTAL : Doit être composé de 5 chiffres.");
      return false;
    }
  }

  function emailControl() {
    if (regexEmailValue(emailUser)) {
      return true;
    } else {
      alert("EMAIL : Non valide");
      return false;
    }
  }
  //Affichage alerte si prénom, nom ville sont incorrectes
  const textAlert = (value) => {
    return `${value} : Chiffres et symboles non valide\n Caractères 2 < 20`;
  };

  // Envoyer formulaire au local storage SI les données sont valides
  if (
    firstNameControl() &&
    lastNameControl() &&
    cityControl() &&
    adressControl() &&
    emailControl()
  ) {
    alert("Votre formulaire est validé.");
    localStorage.setItem("contact", JSON.stringify(contact));
    //Récupération des Id nounours pour envoi serveur
    productLocalStorage.forEach((dataId) => {
      products.push(dataId.id);
    });
    const sendAll = {
      products,
      contact,
    };
    console.log(sendAll);
    postfetch(sendAll);
  }
});

// Envoyer la commande et le formulaire au serveur
function postfetch(sendAll) {
  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    body: JSON.stringify(sendAll),
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => data.json())
    .catch((error) => console.log(error))
    .then((dataResponse) => {
      localStorage.setItem(
        "responseOrderId",
        JSON.stringify(dataResponse.orderId)
      );
      window.location.replace("confirmation.html");
    });
}