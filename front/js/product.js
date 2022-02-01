let searchParams = new URLSearchParams(window.location.search); //Permet de travailler avec la chaîne de requête d'une URL

let id = searchParams.get('id'); //Récupère l'id de la page

const dataApi = fetch(`http://localhost:3000/api/products/${id}`);

//Affichage du prix, description etc ....
dataApi.then(async (responseData) => {
  let response = await responseData.json();

  const title = (document.getElementById('title').innerHTML = response.name); //Donne le nom du produit

  const price = (document.getElementById('price').innerHTML = response.price); //Donne le prix du produit

  const description = (document.getElementById('description').innerHTML = response.description); //Récupère la description du produit

  document.querySelector('.item__img img').setAttribute('src', response.imageUrl); //Récupère l'image du produit

  response.colors.forEach((color) => {
    document.getElementById('colors').innerHTML += `<option value="${color}">${color}</option>`; //Permet d'afficher chaque couleurs des produits
  });
  document.getElementById('title_page').innerHTML = response.name; //Change le nom de l'entête de la page

  //---------------------- Bouton avec addEventListener "CHOISIR QUANTITÉ ET REFRESH LA QUANTITÉ" ------------------------------

  const buttonQuantity = document.getElementById('quantity');
  buttonQuantity.addEventListener('change', () => {
    const priceElem = document.getElementById('quantity');
    //parseInt pour avoir un nombre entier et non une chaine de caractères
    response.quantity = parseInt(priceElem.value);
    let refreshPrice = response.price * response.quantity;

    //Permet d'actualisé le prix en direct sur la page
    document.getElementById('price').innerHTML = refreshPrice;
  });
  //---------------------- Bouton avec addEventListener "AJOUTER AU PANIER" ------------------------------

  const bouton = document.getElementById('addToCart');
  bouton.addEventListener('click', () => {
    //Déclaration de la variable 'productInCart' dans laquelle on met les key et les values qui sont dans le local storage :
    let productInCart = JSON.parse(localStorage.getItem('product'));
    //JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript

    const priceElem = document.getElementById('quantity');

    const colorElem = document.getElementById('colors');

    const addProductInCart = () => {
      //Ajout dans le tableau de l'objet avec les values choisi par l'utilisateur :
      response.quantity = parseInt(priceElem.value); //parseInt pour avoir un nombre entier et non une chaine de caractères
      response.color = colorElem.value;

      //Multiplication du prix par rapport à la quantité
      response.price *= response.quantity;

      productInCart.push(response);
      //La transformation en format JSON et l'envoyer dans la key 'product' du localStorage :
      localStorage.setItem('product', JSON.stringify(productInCart));
    };

    //Si il y a déjà des produits d'enregistré dans le local storage
    if (productInCart) {
      addProductInCart();
    }
    //Si il n'y a pas de produit d'enregistré dans le local storage
    else {
      productInCart = [];
      addProductInCart();
    }
  });
});
