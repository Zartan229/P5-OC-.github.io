//Récupère l'id de l'order de l'url et l'affiche a l'utilisateur.
const getId = () => {
    urlRequest = new URL(window.location.href);
    var id = urlRequest.searchParams.get("id");
    const orderId = document.getElementById("orderId")
    orderId.textContent = id
  };

  getId();