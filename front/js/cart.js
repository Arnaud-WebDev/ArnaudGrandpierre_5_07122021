//Déclaration de la variable 'productInCart' dans laquelle on met les key et les values qui sont dans le local storage :
let productInCart = JSON.parse(localStorage.getItem('product'));
//console.log(productInCart);

//--------------------------- Affichage des produits du panier ---------------------------
//Sélection de la classe où je vais injecter le HTML
const cartItems = document.getElementById('cart__items');
//Si le panier est vide : afficher le panier vide
if (productInCart === null || productInCart === 0) {
  productInCart = [];
  alert('Le panier est vide');
  const cartEmpty = 'Le panier est vide';
  cartItems.innerText = cartEmpty; //Affiche 'Le panier est vide' quand aucun produits n'a été ajouté dans le panier
} else {
  const dataApi = fetch(`http://localhost:3000/api/products`);
  //Affichage du prix, description etc ....

  dataApi.then(async (responseData) => {
    let response = await responseData.json();
    productInCart = productInCart.map((product) => {
      product.price = response.find((r) => {
        return r._id === product._id;
      }).price;
      return product;
    });
    //Si le panier n'est pas vide : afficher les produits dans le local storage
    let structureProductCart = [];
    for (i = 0; i < productInCart.length; i++) {
      const produit = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                  <div class="cart__item__img">
                  <img src="${productInCart[i].imageUrl}" alt="Photographie d'un canapé" />
                  </div>
                  <div class="cart__item__content">
                  <div class="cart__item__content__description">
                  <h2>${productInCart[i].name}</h2>
                  <p>${productInCart[i].color}</p>
                  <p id="priceCart${i}">${productInCart[i].price * productInCart[i].quantity}€</p>
                  </div>
                      <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input type="number" class="itemQuantity"  name="itemQuantity" min="1" max="100" value="${productInCart[i].quantity}" />
                      </div>
                      <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                      </div>
                      </div>
                      </div>
                      </article>
                    `;
      structureProductCart.push(produit);
    }
    if (i === productInCart.length) {
      cartItems.innerHTML = `${structureProductCart}`;
    }
    //---------------------- L'id d'un produit + Bouton supprimer------------------
    const deleteItem = document.querySelectorAll('.deleteItem');

    for (k = 0; k < productInCart.length; k++) {
      let indexProduct = k;

      deleteItem[k].addEventListener('click', (e) => {
        e.preventDefault();
        productInCart.splice(indexProduct, 1);

        //La transformation en format JSON et l'envoyer dans la key 'product' du localStorage :
        localStorage.setItem('product', JSON.stringify(productInCart));

        //Rechargement de la page pour qu'elle s'actualise
        location.reload();

        //Permet de vider le localStorage si c'est le dernier produit, car il renvoi un tableau vide
        if (productInCart === null || (Array.isArray(productInCart) && productInCart.length === 0)) {
          localStorage.clear();
        }
      });
    }

    //------------------------------- Montant total  + quantité total -------------------------------------
    function updateQuantityAndPrice() {
      let total = 0;
      let quantity = 0;
      //Chercher les prix dans le panier
      for (i = 0; i < productInCart.length; i++) {
        let priceProductInCart = productInCart[i].price * productInCart[i].quantity;
        //console.log(priceProductInCart);

        let quantityProductInCart = productInCart[i].quantity;

        total += priceProductInCart;
        quantity += quantityProductInCart;
      }
      //Affichage des articles et des prix dans le HTML
      document.getElementById('totalPrice').innerText = total;
      document.getElementById('totalQuantity').innerText = quantity;
    }

    updateQuantityAndPrice();

    //---------------------- Bouton quantité ------------------

    const boutonQuantity = document.querySelectorAll('.itemQuantity');

    for (let i = 0; i < productInCart.length; i++) {
      let quantityValue = productInCart[i].quantity;
      let price = productInCart[i].price;

      let index = i;

      boutonQuantity[i].addEventListener('change', () => {
        quantityValue = parseInt(boutonQuantity[index].value); // Passe les quantités en nombre entier
        productInCart[index].quantity = quantityValue; // Passe les quantité en nombre entier sur tous les produits

        let total = price * quantityValue;

        localStorage.setItem('product', JSON.stringify(productInCart)); //Modifie le localStorage
        location.reload(); // permet de recharger la page en vue de mettre à jour le localStorage

        document.getElementById('priceCart' + index).innerText = total;

        document.getElementById('totalPrice').innerText = total;
      });
    }
  });
}
//-------------------------------- FORMULAIRES Prénom -------------------------------------
//Contrôle du Prénom

function firstName() {
  const firstNameReg = /^[A-Za-z-ïîëäéèôâêç]{3,20}$/;
  const firstName = document.getElementById('firstName');

  if (firstNameReg.test(firstName.value)) {
    document.getElementById('firstNameErrorMsg').innerText = 'Le prénom est valide';
    document.getElementById('firstNameErrorMsg').style.color = '#9dfc58';
    return true;
  } else {
    document.getElementById('firstNameErrorMsg').innerText = "Le prénom n'est pas valide";
    document.getElementById('firstNameErrorMsg').style.color = '#ff2a00';
    return false;
  }
}

//-------------------------------- FORMULAIRES Nom -------------------------------------
//Contrôle du Nom

function lastName() {
  const lastNameReg = /^[A-Za-z-ïëäéèîôâêç]{3,20}$/;
  const lastName = document.getElementById('lastName');

  if (lastNameReg.test(lastName.value)) {
    document.getElementById('lastNameErrorMsg').innerText = 'Le nom est valide';
    document.getElementById('lastNameErrorMsg').style.color = '#9dfc58';
    return true;
  } else {
    document.getElementById('lastNameErrorMsg').innerText = "Le nom n'est pas valide";
    document.getElementById('lastNameErrorMsg').style.color = '#ff2a00';
    return false;
  }
}

//-------------------------------- FORMULAIRES Adresse -------------------------------------
//Contrôle de l'adresse

function address() {
  const addressReg = /^[A-Za-z0-9éèàçù '']{5,50}$/;
  const address = document.getElementById('address');

  if (addressReg.test(address.value)) {
    document.getElementById('addressErrorMsg').innerText = "L'adresse est valide";
    document.getElementById('addressErrorMsg').style.color = '#9dfc58';
    return true;
  } else {
    document.getElementById('addressErrorMsg').innerText = "L'adresse n'est pas valide";
    document.getElementById('addressErrorMsg').style.color = '#ff2a00';
    return false;
  }
}

//-------------------------------- FORMULAIRES Ville -------------------------------------
//Contrôle de la ville

function city() {
  const cityReg = /^[A-Za-z-éèàçù '']{1,40}$/;
  const city = document.getElementById('city');

  if (cityReg.test(city.value)) {
    document.getElementById('cityErrorMsg').innerText = 'La ville est valide';
    document.getElementById('cityErrorMsg').style.color = '#9dfc58';
    return true;
  } else {
    document.getElementById('cityErrorMsg').innerText = "La ville n'est pas valide";
    document.getElementById('cityErrorMsg').style.color = '#ff2a00';
    return false;
  }
}

//-------------------------------- FORMULAIRES email -------------------------------------

function validationMail() {
  const emailReg = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

  const email = document.getElementById('email');

  if (emailReg.test(email.value) && email.value !== '') {
    document.getElementById('emailErrorMsg').innerText = "L'adresse mail est valide";
    document.getElementById('emailErrorMsg').style.color = '#9dfc58';
    return true;
  } else {
    document.getElementById('emailErrorMsg').innerHTML = "L'adresse mail n'est pas valide &#9888";
    document.getElementById('emailErrorMsg').style.color = '#ff2a00';
    return false;
  }
}

//Permet de mettre un event listener sur les fonctions firstName(), lastName(), city() etc .... Pour permettre à ma condition de push ou non dans le local storage si les input sont correctement rempli
function loadFormEvent() {
  const firstNameElement = document.getElementById('firstName');
  firstNameElement.addEventListener('input', () => {
    firstName();
  });
  const lastNameElement = document.getElementById('lastName');
  lastNameElement.addEventListener('input', () => {
    lastName();
  });
  const addressElement = document.getElementById('address');
  addressElement.addEventListener('input', () => {
    address();
  });
  const cityElement = document.getElementById('city');
  cityElement.addEventListener('input', () => {
    city();
  });
  const emailElement = document.getElementById('email');
  emailElement.addEventListener('input', () => {
    validationMail();
  });
}

loadFormEvent();

//-------------------------------- Bouton Commander -------------------------------------

const formOrder = document.getElementById('formOrder');

formOrder.addEventListener('submit', (e) => {
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
  if (firstName() && lastName() && address() && city() && validationMail() && productInCart === null) {
    alert('Veuillez remplir votre panier');
  }

  if (firstName() && lastName() && address() && city() && validationMail() && productInCart.length) {
    localStorage.setItem('formulaireValues', JSON.stringify(formulaireValues));
  } else if (
    (firstName() && lastName() && address() && city() && validationMail() && productInCart === null) ||
    (firstName() && lastName() && address() && city() && validationMail() && Array.isArray(productInCart) && productInCart.length === 0)
  ) {
    alert('Veuillez remplir le panier avant de pouvoir envoyer le formulaire');
    return false;
  } else {
    alert('Veuillez remplir correctement le formulaire');
    return false;
  }

  //Mettre les values du formulaire et du panier dans un objet pour les envoyer vers un serveur
  const aEnvoyer = {
    products: productInCart.map((product) => product._id),
    contact: formulaireValues,
  };

  fetch(`http://localhost:3000/api/products/order`, {
    method: 'POST',
    body: JSON.stringify(aEnvoyer),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (responseData) => {
    let response = await responseData.json();
    window.location = 'confirmation.html?orderId=' + response.orderId;
  });
});
/* //-------------------------------- Garder les identifiants quand on charge la page  -------------------------------------

//Prendre la key dans le localstorage et la mettre dans une variable
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
