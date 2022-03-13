//Permet de travailler avec la chaîne de requête d'une URL
const searchParams = new URLSearchParams(window.location.search);

//Récupère l'orderId de la page
const orderId = searchParams.get('orderId');

document.getElementById('orderId').innerHTML = `${orderId}`;

localStorage.clear();
