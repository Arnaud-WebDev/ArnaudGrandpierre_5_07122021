//Déclaration de la variable 'productInCart' dans laquelle on met les key et les values qui sont dans le local storage :
let productInCart = JSON.parse(localStorage.getItem('product'));

//JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript

//--------------------------- Affichage des produits du panier ---------------------------
//Sélection de la classe où je vais injecter le HTML
const cartItems = document.getElementById('cart__items');

//Si le panier est vide : afficher le panier vide
if (productInCart === null || productInCart == 0) {
  const cartEmpty = `<h2> Le panier est vide</h2>`;
  cartItems.innerHTML = cartEmpty; //Affiche 'Le panier est vide' quand aucun produits n'a été ajouté dans le panier
  // console.log('je suis vide');
} else {
  //Si le panier n'est pas vide : afficher les produits dans le local storage
  let strutureProductCart = [];

  for (i = 0; i < productInCart.length; i++) {
    strutureProductCart =
      strutureProductCart +
      `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${productInCart[i].imageUrl}" alt="Photographie d'un canapé" />
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productInCart[i].name}</h2>
                    <p>${productInCart[i].color}</p>
                    <p id="priceCart${i}">${productInCart[i].price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input type="number" class="itemQuantity" id="itemQuantity2" name="itemQuantity" min="1" max="100" value="${productInCart[i].quantity}" />
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                  </div>
                  </article>
                  `;
  }

  if (i == productInCart.length) {
    cartItems.innerHTML = `${strutureProductCart}`;
  }
}

//---------------------- L'id d'un produit + Bouton supprimer------------------
const deleteItem = document.querySelectorAll('.deleteItem');
//console.log(deleteItem);

for (k = 0; k < productInCart.length; k++) {
  let idProduct = productInCart[k]._id;
  //console.log(idProduct);
  let indexProduct = k;
  //console.log(idProduct);
  deleteItem[k].addEventListener('click', (e) => {
    e.preventDefault();
    //console.log(indexProduct);
    productInCart.splice(indexProduct, 1);

    //La transformation en format JSON et l'envoyer dans la key 'product' du localStorage :
    localStorage.setItem('product', JSON.stringify(productInCart));

    //Rechargement de la page pour qu'elle s'actualise
    window.location.href = 'cart.html';
  });
}

//---------------------- Bouton quantité ------------------

const boutonQuantity = document.querySelectorAll('#itemQuantity2');

for (i = 0; i < productInCart.length; i++) {
  let quantity = productInCart[i].quantity;
  //console.log(quantity);

  let price = productInCart[i].price;
  let index = i;
  let price2 = productInCart[i];

  boutonQuantity[i].addEventListener('change', () => {
    let total = price * parseInt(boutonQuantity[index].value);
    console.log(total);

    document.getElementById('priceCart' + index).innerHTML = ` ${total} €`;
  });
}

//------------------------------- Montant total  + quantité total -------------------------------------

let total = [];
let quantity = [];

//Chercher les prix dans le panier
for (i = 0; i < productInCart.length; i++) {
  let priceProductInCart = productInCart[i].price;
  //console.log(priceProductInCart);
  let quantityProductInCart = productInCart[i].quantity;
  //console.log(quantityProductInCart);

  //Mettre les prix du panier dans la variable total
  total.push(priceProductInCart);

  //Mettre la quantité du panier dans la variable quantity
  quantity.push(quantityProductInCart);
  //console.log(quantity);
}

//Addition de la quantité et des prix qu'il y a dans le tableau
let reducer = (previousValue, currentValue) => previousValue + currentValue;
let totalPrice = total.reduce(reducer, 0);
let totalQuantity = quantity.reduce(reducer, 0);

//Affichage des articles et des prix dans le HTML
document.getElementById('totalPrice').innerHTML = totalPrice;
document.getElementById('totalQuantity').innerHTML = totalQuantity;

//-------------------------------- FORMULAIRES Prénom -------------------------------------
//Contrôle du Prénom

function firstName() {
  const firstNameReg = /^[A-Za-z]{0,20}$/;
  let firstName = document.getElementById('firstName');
  firstName.addEventListener('input', () => {
    if (firstNameReg.test(document.getElementById('firstName').value)) {
      document.getElementById('firstNameErrorMsg').innerText = `Le prénom est valide`;
      return true;
    } else {
      document.getElementById('firstNameErrorMsg').innerText = `Le prénom n'est pas valide`;
      alert('Chiffre et symbole ne sont pas autorisé \n Ne pas depasser 20 caractères');
      return false;
    }
  });
}

firstName();

//-------------------------------- FORMULAIRES Nom -------------------------------------
//Contrôle du Nom

function lastName() {
  const lastNameReg = /^[A-Za-z]{3,20}$/;
  let lastName = document.getElementById('lastName');
  lastName.addEventListener('input', () => {
    if (lastNameReg.test(document.getElementById('lastName').value)) {
      document.getElementById('lastNameErrorMsg').innerHTML = `Le nom est valide`;
      return true;
    } else {
      document.getElementById('lastNameErrorMsg').innerHTML = `Le nom n'est pas valide`;
      return false;
    }
  });
}

lastName();

//-------------------------------- FORMULAIRES Adresse -------------------------------------
//Contrôle de l'adresse

function address() {
  const addressReg = /^[A-Za-z0-9éèàç '']{5,50}$/;
  let address = document.getElementById('address');
  address.addEventListener('input', () => {
    if (addressReg.test(document.getElementById('address').value)) {
      document.getElementById('addressErrorMsg').innerHTML = `L'addresse est valide`;
      return true;
    } else {
      document.getElementById('addressErrorMsg').innerHTML = `L'addresse n'est pas valide`;
      return false;
    }
  });
}
address();

//-------------------------------- FORMULAIRES Ville -------------------------------------
//Contrôle de la ville

function city() {
  const cityReg = /^[A-Za-z-éèàçù '']{1,40}$/;
  let city = document.getElementById('city');
  city.addEventListener('input', () => {
    if (cityReg.test(document.getElementById('city').value)) {
      document.getElementById('cityErrorMsg').innerHTML = `La ville est valide`;
      return true;
    } else {
      document.getElementById('cityErrorMsg').innerHTML = `La ville n'est pas valide`;
      return false;
    }
  });
}

city();

//-------------------------------- FORMULAIRES email -------------------------------------

function validationMail() {
  const emailReg = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

  const email = document.getElementById('email');

  email.addEventListener('input', () => {
    if (emailReg.test(document.getElementById('email').value)) {
      document.getElementById('emailErrorMsg').innerHTML = `L'adresse mail est valide`;
      document.getElementById('emailErrorMsg').style.color = '#9dfc58';
      return true;
    } else {
      document.getElementById('emailErrorMsg').innerHTML = `L'adresse mail n'est pas valide &#9888`;
      document.getElementById('emailErrorMsg').style.color = '#ff2a00';
      return false;
    }
  });
}

validationMail();

//-------------------------------- Bouton Commander -------------------------------------

const buttonOrder = document.getElementById('order');
//console.log(buttonOrder);

buttonOrder.addEventListener('click', (e) => {
  e.preventDefault();

  //Récupération des valeurs formulaire
  const formulaireValues = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value,
  };

  //Mettre l'objet "formulaireValues" dans le local storage et le transformer en chaine de caractères avec "stringify" car c'était un objet
  if (firstName() && lastName() && address() && city() && validationMail()) {
    console.log('erreur');
    localStorage.setItem('formulaireValues', JSON.stringify(formulaireValues));
  } else {
    alert('Veuillez remplir correctement le formulaire');
  }

  //Mettre les values du formulaire et du panier dans un objet pour les envoyer vers un serveur
  /*  const aEnvoyer = {
    products: productInCart.map((product) => product._id),
    contact: formulaireValues,
  };
  console.log(aEnvoyer);
  fetch(`http://localhost:3000/api/products/order`, {
    method: 'POST',
    body: JSON.stringify(aEnvoyer),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (responseData) => {
    let response = await responseData.json();
    window.location = 'confirmation.html?orderId=' + response.orderId;
  }); */
  //document.getElementById('orderId').innerHTML = `${response.orderId}`;
});

//-------------------------------- Garder les identifiants quand on charge la page  -------------------------------------

/* //Prendre la key dans le localstorage et la mettre dans une variable
const dataLocalStorage = localStorage.getItem('formulaireValues');
//console.log(dataLocalStorage);

//Convertir la chaîne de caractère en objet JavaScript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);
//console.log(dataLocalStorageObjet);

//Function pour que le champs du formulaire soit rempli par les données du local storage si elle existe
function champsRempli(input) {
  //(input va prendre la valeur de firstname, lastName, city email etc .......)
  document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
}

champsRempli('firstName');
champsRempli('lastName');
champsRempli('address');
champsRempli('city');
champsRempli('email');
 */
