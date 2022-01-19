let searchParams = new URLSearchParams(window.location.search); //Permet de travailler avec la chaîne de requête d'une URL
//console.log(searchParams);
let id = searchParams.get('id'); //Récupère l'id de la page
//console.log(id);

const dataApi = fetch(`http://localhost:3000/api/products/${id}`);

//Affichage du prix, description etc ....
dataApi.then(async (responseData) => {
  //console.log(responseData);

  let response = await responseData.json();
  //console.log(response);

  const title = (document.getElementById('title').innerHTML = response.name); //Donne le nom du produit
  //console.log(title);

  const price = (document.getElementById('price').innerHTML = response.price); //Donne le prix du produit
  // console.log(price);

  const description = (document.getElementById('description').innerHTML = response.description); //Récupère la description du produit
  //console.log(description);

  document.querySelector('.item__img img').setAttribute('src', response.imageUrl); //Récupère l'image du produit

  response.colors.forEach((color) => {
    // console.log(color);
    // console.log(`<option value="${color}">${color}</option>`);
    document.getElementById('colors').innerHTML += `<option value="${color}">${color}</option>`; //Permet d'afficher chaque couleurs des produits
  });
  document.getElementById('title_page').innerHTML = response.name; //Change le nom de l'entête de la page

  //---------------------- Bouton avec addEventListener ------------------------------
  const bouton = document.getElementById('addToCart');
  bouton.addEventListener('click', () => {
    //Déclaration de la variable 'productInCart' dans laquelle on met les key et les values qui sont dans le local storage :
    let productInCart = JSON.parse(localStorage.getItem('product'));
    //console.log(productInCart);
    //JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript

    const addProductInCart = () => {
      //Ajout dans le tableau de l'objet avec les values choisi par l'utilisateur :
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
