//Permet de travailler avec la chaîne de requête d'une URL
let searchParams = new URLSearchParams(window.location.search);

//Récupère l'orderId de la page
let orderId = searchParams.get('orderId');
console.log(orderId);

document.getElementById('orderId').innerHTML = `${orderId}`;

localStorage.clear();
