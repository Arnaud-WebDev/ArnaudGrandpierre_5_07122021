fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    renderProducts(data);
  });

function renderProducts(products) {
  //console.log(products);
  products.forEach((product) => {
    // console.log(product);
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
