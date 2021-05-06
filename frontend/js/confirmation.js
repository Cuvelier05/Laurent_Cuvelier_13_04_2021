let price = JSON.parse(localStorage.getItem("totalPriceCommand"));
let orderId = JSON.parse(localStorage.getItem("responseOrderId"));
let userInfo = JSON.parse(localStorage.getItem("contact"));

// console.log(price);
console.log(orderId);
console.log(userInfo);

let showCommand = document.querySelector("#commandNumber");
function showCommandNumber() {
  showCommand.innerHTML = `
  <p>Votre commande <br> numéro: <strong>${orderId}</strong> <br> et d'un montant de <strong>${price}</strong>€ sera envoyé à l'adresse suivante :<strong>${userInfo.address} ${userInfo.city}</strong>.</p>
  <p>Merci <strong>${userInfo.lastName} ${userInfo.firstName}</strong> pour votre achat.</p><br>
  <p>A trés bientôt pour un nouvel achat.</p>
  `;
}
showCommandNumber();
localStorage.clear();
