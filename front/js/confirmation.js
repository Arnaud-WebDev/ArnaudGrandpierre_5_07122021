let searchParams = new URLSearchParams(window.location.search); //Permet de travailler avec la chaîne de requête d'une URL

let orderId = searchParams.get('orderId'); //Récupère l'id de la page

/* const dataApi =  */ fetch(`http://localhost:3000/api/products/${orderId}`)
  .then((response) => response.json())
  .then((data) => {
    data;
  });

/* dataApi.then(async (responseData) => {
  let response = await responseData.json();
  console.log(response);
});

document.getElementById('orderId').innerHTML = `${response.orderId}`; */
