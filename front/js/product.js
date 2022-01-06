let searchParams = new URLSearchParams(window.location.search); //Permet de travailler avec la chaîne de requête d'une URL
console.log(searchParams);
let id = searchParams.get('id'); //Récupère l'id de la page
console.log(id);

const dataApi = fetch(`http://localhost:3000/api/products/${id}`);

//Affichage du prix, description etc ....
dataApi.then(async (responseData) => {
  console.log(responseData);

  const response = await responseData.json();
  console.log(response);

  const title = (document.getElementById('title').innerHTML = response.name);
  console.log(title);

  const price = (document.getElementById('price').innerHTML = response.price);
  console.log(price);

  const description = (document.getElementById('description').innerHTML = response.description);
  console.log(description);

  document.querySelector('.item__img img').setAttribute('src', response.imageUrl);

  response.colors.forEach((color) => {
    console.log(color);
    console.log(`<option value="${color}">${color}</option>`);
    document.getElementById('colors').innerHTML += `<option value="${color}">${color}</option>`;
  });
});

//console.log(title);

/* fetch('http://localhost:3000/api/products/${_id}');
console.log(fetch); */
/* document.getElementById('title').innerHTML = searchParams.title;  */
/* const products = [
  {
    colors: ['Blue', 'White', 'Black'],
    _id: '107fb5b75607497b96722bda5b504926',
    name: 'Kanap Sinopé',
    price: 1849,
    imageUrl: 'kanap01.jpeg',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    altTxt: "Photo d'un canapé bleu, deux places",
  },
  {
    colors: ['Black/Yellow', 'Black/Red'],
    _id: '415b7cacb65d43b2b5c1ff70f3393ad1',
    name: 'Kanap Cyllène',
    price: 4499,
    imageUrl: 'kanap02.jpeg',
    description: 'Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.',
    altTxt: "Photo d'un canapé jaune et noir, quattre places",
  },
  {
    colors: ['Green', 'Red', 'Orange'],
    _id: '055743915a544fde83cfdfc904935ee7',
    name: 'Kanap Calycé',
    price: 3199,
    imageUrl: 'kanap03.jpeg',
    description: 'Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.',
    altTxt: "Photo d'un canapé d'angle, vert, trois places",
  },
  {
    colors: ['Pink', 'White'],
    _id: 'a557292fe5814ea2b15c6ef4bd73ed83',
    name: 'Kanap Autonoé',
    price: 1499,
    imageUrl: 'kanap04.jpeg',
    description: 'Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.',
    altTxt: "Photo d'un canapé rose, une à deux place",
  },
  {
    colors: ['Grey', 'Purple', 'Blue'],
    _id: '8906dfda133f4c20a9d0e34f18adcf06',
    name: 'Kanap Eurydomé',
    price: 2249,
    imageUrl: 'kanap05.jpeg',
    description: 'Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.',
    altTxt: "Photo d'un canapé gris, trois places",
  },
  {
    colors: ['Grey', 'Navy'],
    _id: '77711f0e466b4ddf953f677d30b0efc9',
    name: 'Kanap Hélicé',
    price: 999,
    imageUrl: 'kanap06.jpeg',
    description: 'Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.',
    altTxt: "Photo d'un canapé gris, deux places",
  },
  {
    colors: ['Red', 'Silver'],
    _id: '034707184e8e4eefb46400b5a3774b5f',
    name: 'Kanap Thyoné',
    price: 1999,
    imageUrl: 'kanap07.jpeg',
    description: 'EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.',
    altTxt: "Photo d'un canapé rouge, deux places",
  },
  {
    colors: ['Pink', 'Brown', 'Yellow', 'White'],
    _id: 'a6ec5b49bd164d7fbe10f37b6363f9fb',
    name: 'Kanap orthosie',
    price: 3999,
    imageUrl: 'kanap08.jpeg',
    description: 'Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.',
    altTxt: "Photo d'un canapé rose, trois places",
  },
]; */

/* // Utilisation de la méthode .find
const idProduct = products.find((element) => element._id === id);
console.log(idProduct);

// Sélection de la classe dans laquelle on va injecter le code html
const positionElement = document.querySelector('.item');
console.log(positionElement);

// La structure html pour l'affichage du produit selectionné
const structureProduit = `<article>
            <div class="item__img">
              <img src="${idProduct.imageUrl}" />
            </div>
            <div class="item__content">
              <div class="item__content__titlePrice">
                <h1 id="title">${idProduct.name}</h1>
                <p>Prix : <span id="price"> ${idProduct.price} </span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${idProduct.description}</p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Choisir une couleur :</label>
                  <select name="color-select" id="colors">
                    <option value="">--SVP, choisissez une couleur --</option>
                    <option value="vert">vert</option>
                    <option value="blanc">blanc</option>
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity" />
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>
            </div>
          </article>
          `;

//Injection HTML

positionElement.innerHTML = structureProduit; */

// let response = fetch('http://localhost:3000/api/products/${id}');
/* const image = params.get('item_img');
const title = params.get('title');
const price = params.get('price');
const description = params.get('description');

console.log(title);
 */
/* const queryString_url_id = window.location.search;
console.log(queryString_url_id);

const ID = queryString_url_id.slice(1);
console.log(ID);
 */

// Utilisation de la méthode .find
