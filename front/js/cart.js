//Déclaration de la variable 'productInCart' dans laquelle on met les key et les values qui sont dans le local storage :
let productInCart = JSON.parse(localStorage.getItem('product'));
console.log('productInCart = ');
console.log(productInCart);
//JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript

//--------------------------- Affichage des produits du panier ---------------------------
//Sélection de la classe où je vais injecter le HTML
const cartItems = document.getElementById('cart__items');
//console.log(cartItems);

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
                    <p>${productInCart[i].price} €</p>
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
    cartItems.innerHTML = strutureProductCart;
  }
}

//---------------------- L'id d'un produit + Bouton supprimer------------------
const deleteItem = document.querySelectorAll('.deleteItem');
console.log(deleteItem);

for (k = 0; k < productInCart.length; k++) {
  let idProduct = productInCart[k]._id;
  console.log(idProduct);
  deleteItem[k].addEventListener('click', (e) => {
    e.preventDefault();
    productInCart.splice(idProduct, 1);
    console.log(productInCart);

    //La transformation en format JSON et l'envoyer dans la key 'product' du localStorage :
    localStorage.setItem('product', JSON.stringify(productInCart));

    //Rechargement de la page pour qu'elle s'actualise
    window.location.href = 'cart.html';
  });
}

//---------------------- Bouton quantité ------------------

const boutonQuantity = document.querySelectorAll('#itemQuantity2');
console.log('btn_qty = ');
console.log(boutonQuantity);
for (i = 0; i < productInCart.length; i++) {
  let quantity = productInCart[i].quantity;
  console.log(quantity);
  boutonQuantity[i].addEventListener('change', () => {
    console.log(quantity);

    //La transformation en format JSON et l'envoyer dans la key 'product' du localStorage :
    localStorage.setItem('product', JSON.stringify(productInCart));
  });
}

//------------------------------- Montant total -------------------------------------

let total = [];

//Chercher les prix dans le panier
for (i = 0; i < productInCart.length; i++) {
  let priceProductInCart = productInCart[i].price;
  console.log(priceProductInCart);

  //Mettre les prix du panier dans la variable total
  total.push(priceProductInCart);
  console.log(total);
}

//Addition des prix qu'il y a dans le tableau
let reducer = (previousValue, currentValue) => previousValue + currentValue;
let total2 = total.reduce(reducer, 0);
console.log(total2);
document.getElementById('totalQuantity').innerHTML = total2;
//------------------------------- Test -------------------------------------

/* for (j = 0; j < deleteItem.length; j++) {
  deleteItem[j].addEventListener('click', (e) => {
    e.preventDefault();
    let deleteId = productInCart[j].searchId;
    console.log(deleteId);
    productInCart = productInCart.filter((el) => el !== deleteId);
  });
} */
/* localStorage.removeItem('product'); */
