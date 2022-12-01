const getId = () => {
    urlRequest = new URL(window.location.href);
    var id = urlRequest.searchParams.get("id");
    const orderId = document.getElementById("orderId")
    orderId.textContent = id
  };

  getId();