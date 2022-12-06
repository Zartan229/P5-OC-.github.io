let products = [];
//getProducts récupère les données dans l'API.
const getProducts = async () => {
  await fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })

    .then((data) => {
      products = data;
      storage = JSON.parse(localStorage.getItem("obj"));
      showCart(storage, products);

      const doc = document.querySelectorAll(".itemQuantity");
      doc.forEach((docx) => {
        docx.addEventListener("change", changeQuantity);
      });
      let button = document.getElementById("order");
      button.addEventListener("click", verifyUserData);

      quantityCart();
      priceCart();
      deleteProduct();
    })
    .catch(function (err) {
      console.log(err);
    });
};
//Dans productToDelete on stock un array d'objet qui contient toute les class lier a .deleteItem
//ensuite pour chaque produit qui existe on a initialiser le bouton supprimer qui lui est lier
//puis finalement nous allons vérifier quelle objet a supprimer en récupérent les dataset id et colors les plus proche
//ensuite on effectue une passe, si les dataset corresponde a un élément dans le localstorage cet elément est suprimer.
const deleteProduct = () => {
  const productToDelete = document.querySelectorAll(".deleteItem");

  productToDelete.forEach((productToDeleteSelected) => {
    productToDeleteSelected.addEventListener("click", function () {
      Object.keys(storage).forEach((key) => {
        if (storage[key].id == this.closest("article").dataset.id && storage[key].colors == this.closest("article").dataset.colors) {
          console.log(key);
          storage.splice(key, 1);
          localStorage.setItem("obj", JSON.stringify(storage));
          window.setTimeout(function () {
            window.location.reload();
          });
        }
      });
    });
  });
};
//Dans quantityToChange on stock un array d'objet qui contient toute les class lier a .itemQuantity
//la fonction va chercher dans le localStorage quelle élement correspond au plus proche dataset id et colors
//il retourne le résultat et si c'est unrésultat valable il le push dans le localStorage
const changeQuantity = () => {
  let quantityToChange = document.querySelectorAll(".itemQuantity");
  quantityToChange.forEach((quantityChanged) => {
    const productInLocalStorage = storage.find((product) => product.id == quantityChanged.closest("article").dataset.id && product.colors == quantityChanged.closest("article").dataset.colors);
    if (productInLocalStorage.quantity != quantityChanged.value) {
      if (quantityChanged.value <= 0 || quantityChanged.value > 100) {
        alert("La quantiter ne peux pas être inférieur a 1 et supérieur a 100");
        quantityChanged.value = 1;
        productInLocalStorage.quantity = quantityChanged.value;
        localStorage.setItem("obj", JSON.stringify(storage));
      }
      else
      {
        productInLocalStorage.quantity = quantityChanged.value;
        localStorage.setItem("obj", JSON.stringify(storage));
      }
    }
  });
};
//Récupère le fetch des produit ainsi que ceux présent dans le localStorage
//Affiche les produits séléctionner, ainsi que leurs information.
const showCart = (storage, products) => {
  Object.keys(storage).forEach((key) => {
    PrdouctDetail = products.find((prod) => storage[key].id == prod._id);
    if (PrdouctDetail) {
      let getElementMaster = document.getElementById("cart__items");
      const setElementArticle = document.createElement("article");
      setElementArticle.classList.add("cart__item");
      setElementArticle.dataset.id = PrdouctDetail._id;
      setElementArticle.dataset.colors = storage[key].colors;
      getElementMaster.appendChild(setElementArticle);
      const setElementDiv = document.createElement("div");
      setElementDiv.classList.add("cart__item__img");
      setElementArticle.appendChild(setElementDiv);
      const setElementImg = document.createElement("img");
      setElementImg.src = PrdouctDetail.imageUrl;
      setElementImg.alt = PrdouctDetail.altTxt;
      setElementDiv.appendChild(setElementImg);
      const setElementSecondDiv = document.createElement("div");
      setElementSecondDiv.classList.add("cart__item__content");
      setElementArticle.appendChild(setElementSecondDiv);
      const setElementSecondFirstDiv = document.createElement("div");
      setElementSecondFirstDiv.classList.add("cart__item__content__description");
      setElementSecondDiv.appendChild(setElementSecondFirstDiv);
      const setElementSecondFirstDivTitle = document.createElement("h2");
      setElementSecondFirstDivTitle.textContent = PrdouctDetail.name;
      const setElementSecondFirstDivP = document.createElement("p");
      setElementSecondFirstDivP.textContent = storage[key].colors;
      const setElementSecondFirstDivPSecond = document.createElement("p");
      setElementSecondFirstDivPSecond.textContent = PrdouctDetail.price = storage[key].quantity * PrdouctDetail.price;
      setElementSecondFirstDivPSecond.textContent = PrdouctDetail.price + " €";
      setElementSecondFirstDiv.appendChild(setElementSecondFirstDivTitle);
      setElementSecondFirstDiv.appendChild(setElementSecondFirstDivP);
      setElementSecondFirstDiv.appendChild(setElementSecondFirstDivPSecond);
      const setElementThirdDiv = document.createElement("div");
      setElementThirdDiv.classList.add("cart__item__content__settings");
      setElementArticle.appendChild(setElementThirdDiv);
      const setElementThirdFirstDiv = document.createElement("div");
      setElementThirdFirstDiv.classList.add("cart__item__content__settings__quantity");
      setElementThirdDiv.appendChild(setElementThirdFirstDiv);
      const setElementThirdFirstDivP = document.createElement("p");
      setElementThirdFirstDiv.appendChild(setElementThirdFirstDivP);
      setElementThirdFirstDivP.textContent = "Qté :";
      const setElementThirdFirstDivInput = document.createElement("input");
      setElementThirdFirstDiv.appendChild(setElementThirdFirstDivInput);
      setElementThirdFirstDivInput.type = "number";
      setElementThirdFirstDivInput.classList.add("itemQuantity");
      setElementThirdFirstDivInput.name = "itemQuantity";
      setElementThirdFirstDivInput.min = "1";
      setElementThirdFirstDivInput.max = "100";
      setElementThirdFirstDivInput.value = storage[key].quantity;
      const setElementThirdSecondDiv = document.createElement("div");
      setElementThirdDiv.appendChild(setElementThirdSecondDiv);
      setElementThirdSecondDiv.classList.add("cart__item__content__settings__delete");
      const setElementThirdSecondDivP = document.createElement("p");
      setElementThirdSecondDivP.textContent = "Supprimer";
      setElementThirdSecondDiv.appendChild(setElementThirdSecondDivP);
      setElementThirdSecondDivP.classList.add("deleteItem");
    }
  });
};
//Récupère l'objet order et l'envoie dans une requête.
//data est placer dans products.
//res.json donne accès a la réponse qui fournit un orderId.
//window.location.replace permet de changer d'url, donc on peut changer de page 
//et fournir l'id de l'ordre en même temps
const postOrder = async (order) => {
  const response = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      products = data;
      window.location.replace("./confirmation.html?id=" + products.orderId);
    });
};
//Créer des rexEx et les test sur chaque champs correspondant.
//Bloque l'envoie si il y'as un problême sinon, envoie les donnée.
//Crée l'objet order qui contient une liste d'objet et un tableau
const verifyUserData = () => {
  const regExFirstLastName = /^[\w'\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i;
  const regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
  const regExAddress = /^([a-zA-z0-9/\\''(),-\s]{2,255})$/i;
  const regExCity = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\']+$/i;
  let error = 0;

  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let address = document.getElementById("address");
  let city = document.getElementById("city");
  let email = document.getElementById("email");

  if(!storage)
  {
  if (firstName.value.match(regExFirstLastName)) {
  } else {
    let errorName = document.getElementById("firstNameErrorMsg");
    errorName.textContent = "Caractère refuser";
    alert("erreur prénom");
    error = 1;
  }
  if (lastName.value.match(regExFirstLastName)) {
  } else {
    let errorName = document.getElementById("lastNameErrorMsg");
    errorName.textContent = "Caractère refuser";
    alert("erreur nom");
    error = 1;
  }
  if (address.value.match(regExAddress)) {
  } else {
    let errorName = document.getElementById("addressErrorMsg");
    errorName.textContent = "Caractère refuser";
    alert("erreur addresse");
    error = 1;
  }
  if (city.value.match(regExCity)) {
  } else {
    let errorName = document.getElementById("cityErrorMsg");
    errorName.textContent = "Caractère refuser";
    alert("erreur city");
    error = 1;
  }
  if (email.value.match(regExEmail)) {
  } else {
    let errorMail = document.getElementById("emailErrorMsg");
    errorMail.textContent = "Erreur dans le mail";
    alert("mail refuser");
    error = 1;
  }
  if (error >= 1) {
    error = 0;
    addEventListener("click", function (event) {
      event.preventDefault();
    });
  } else {
    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };

    let products = [];

    Object.keys(storage).forEach((key) => {
      products.push(storage[key].id);
    });
    let order = {
      contact: contact,
      products: products,
    };
    postOrder(order);
  }}
  else{
    alert("riend dans le panier")
    addEventListener("click", function (event) {
      event.preventDefault();
    });
  }
};
// Calcule le nombre de canaper souhaiter dans le localStorage
//ajoute le résultat dans le DOM
const quantityCart = () => {
  const quantityItem = document.getElementById("totalQuantity");
  let numberOfItem = 0;
  Object.keys(storage).forEach((key) => {
    numberOfItem = parseInt(storage[key].quantity) + parseInt(numberOfItem);
  });
  quantityItem.textContent = numberOfItem;
};
//Pour chaque produit dans le localStorage on compare l'id a celui dans le fetch.
//On ajoute le prix récolter dans price qui augmente celon les canaper trouver
//ensuite on l'ajoute dans le dom
const priceCart = () => {
  const priceOfItem = document.getElementById("totalPrice");
  let price = 0;
  products.forEach((product) => {
    Object.keys(storage).forEach((key) => {
      if (storage[key].id == product._id) {
        price = parseInt(product.price) + parseInt(price);
      }
    });
    priceOfItem.textContent = price;
  });
};
getProducts();
