//Déclaration de la variable 'productInCart' dans laquelle on met les key et les values qui sont dans le local storage :
let productInCart = JSON.parse(localStorage.getItem('product'));
//JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
console.log(productInCart);

//--------------------------- Affichage des produits du panier ---------------------------
//Sélection de la classe où je vais injecter le HTML
const cartItems = document.getElementById('cart__items');
console.log(cartItems);

//Si le panier est vide : afficher le panier vide
if (productInCart === null) {
  const cartEmpty = `<h2> Le panier est vide</h2>`;
  cartItems.innerHTML = cartEmpty; //Affiche 'Le panier est vide' quand aucun produits n'a été ajouté dans le panier
  console.log('je suis vide');
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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInCart[i].quantity}" />
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
