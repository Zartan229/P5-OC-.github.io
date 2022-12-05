let products = [];

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

const changeQuantity = () => {
  var elems = document.querySelectorAll(".itemQuantity");

  elems.forEach((element) => {
    console.log(element.value);
    console.log(element.closest("article").dataset.id);
    console.log(element.closest("article").dataset.colors);

    const productInLocalStorage = storage.find(
      (product) => product.id == element.closest("article").dataset.id && product.colors == element.closest("article").dataset.colors
    );

    if (productInLocalStorage.quantity != element.value) {
      if (element.value <= 0 || element.value > 100) {
        alert("La quantiter ne peux pas être inférieur a 1 et supérieur a 100");
        element.value = 1;
        productInLocalStorage.quantity = element.value;
        localStorage.setItem("obj", JSON.stringify(storage));
      }
    }
  });
};

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
    let order = {
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
    let contact = {
      contact: order,
      products: products,
    };
    postOrder(contact);
  }
};

const quantityCart = () => {
  const quantityItem = document.getElementById("totalQuantity");
  let numberOfItem = 0;
  Object.keys(storage).forEach((key) => {
    numberOfItem = parseInt(storage[key].quantity) + parseInt(numberOfItem);
  });
  quantityItem.textContent = numberOfItem;
};
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
