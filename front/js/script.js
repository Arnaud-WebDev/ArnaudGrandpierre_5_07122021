//La méthode fetch() permet de consulter l'API
fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    renderProducts(data);
  })
  .catch((error) => {
    document.getElementById('items').innerText = "Une erreur s'est produite lors du chargement de la page en voici la cause : " + error;
  });

function renderProducts(products) {
  //console.log(products);
  products.forEach((product) => {
    //console.log(product);
    const html = ` <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt} />
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
    document.getElementById('items').innerHTML += html;
  });
}
