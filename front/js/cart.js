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
      a = JSON.parse(localStorage.getItem("obj"));
      showCart(a, products);

      const doc = document.querySelectorAll('.itemQuantity')
     // console.log(doc)
      doc.forEach(docx => {
        docx.addEventListener('change', changeQuantity)})
    //  console.log(a)
     // doc.addEventListener("change", changeQuantity);

}
 //  return data;
    )
    .catch(function (err) {
      // Une erreur est survenue
    });
};
const bob = () => {
  console.log("bob is here")
}


const changeQuantity = () => {
//console.log("bob1")
var elems = document.querySelectorAll(".itemQuantity");
 // console.log(elems[1].value)
  elems.forEach((element) => {
    console.log(element.value);
    console.log(element.closest("article").dataset.id);
    console.log(element.closest("article").dataset.colors);

      const productInLocalStorage = a.find((product) => product.id == element.closest("article").dataset.id && product.colors == element.closest("article").dataset.colors);
      
      //console.log(productInLocalStorage.quantity)
      productInLocalStorage.quantity = element.value
      localStorage.setItem("obj", JSON.stringify(a));
    
 
  })
  }
/*
const sendFetch = ((products) => {
  data = products
  return data
})*/
/*
selectElement.addEventListener('change', (event) => {
  const result = document.querySelector('.result');
  result.textContent = `You like ${event.target.value}`;

});
*/
//console.log(obj.getItem("id"))
//console.log(obj)
//   );
/*
const deleteFromCart = () => {
  a = JSON.parse(localStorage.getItem("obj"));
  sendFetch(products)
  Object.keys(a).forEach((key) => {
    // console.log(a[key]);
    const el = document.querySelector(".cart__item");
  //  console.log(el.dataset.id)
  //  console.log(el.dataset.colors)
  Array.prototype.forEach.call(timestamps, function (timestamp) {
    localTime = updateLocalTime(timestamp.innerHTML);
    timestamp.innerHTML = localTime;
  });
     PrdouctDetail = sendFetch(products).find((prod) => a[key].id == prod._id && a[key].quantity == document.querySelector(".itemQuantity").value)
   //  console.log(PrdouctDetail)
     if(PrdouctDetail)
     {

      console.log("tente de suprimmer produit avec id " + PrdouctDetail._id + " et une couleur de " + a[key].colors + " et une quantité de " + a[key].quantity)
     

     }
     else{
       console.log("echec")
     }
 
 })


}*/

const showCart = (a, products) => {
  // console.log(products)

  // console.log(a)

  /*
  products.forEach((product) => {
    ProductDetail = a.find((prod) => prod.id == product._id);

    if(ProductDetail)
    {
      console.log("id trouver")
    }
  })*/

  Object.keys(a).forEach((key) => {
    // console.log(a[key]);
    PrdouctDetail = products.find((prod) => a[key].id == prod._id);
    // console.log(PrdouctDetail)
    if (PrdouctDetail) {
      //console.log("trouver")
      let getElementMaster = document.getElementById("cart__items");
      const setElementArticle = document.createElement("article");
      setElementArticle.classList.add("cart__item");
      setElementArticle.dataset.id = PrdouctDetail._id;
      setElementArticle.dataset.colors = a[key].colors;
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
      setElementSecondFirstDivP.textContent = a[key].colors;
      const setElementSecondFirstDivPSecond = document.createElement("p");
      setElementSecondFirstDivPSecond.textContent = PrdouctDetail.price = a[key].quantity * PrdouctDetail.price;
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
      setElementThirdFirstDivInput.value = a[key].quantity;
      const setElementThirdSecondDiv = document.createElement("div");
      setElementThirdDiv.appendChild(setElementThirdSecondDiv);
      setElementThirdSecondDiv.classList.add("cart__item__content__settings__delete");
      const setElementThirdSecondDivP = document.createElement("p");
      setElementThirdSecondDivP.textContent = "Supprimer";
      setElementThirdSecondDiv.appendChild(setElementThirdSecondDivP);
      setElementThirdSecondDivP.classList.add("deleteItem");
    } else {
      console.log("echec");
    }
  });

  /*
  Object.keys(obj).forEach((key) => {
    console.log(obj[key]);
    let getElementMaster = document.getElementById("cart__items");
    const setElementArticle = document.createElement("article");
    setElementArticle.classList.add("cart__item");
    setElementArticle.dataset.id = obj[key].id;
    setElementArticle.dataset.colors = obj[key].colors;
    getElementMaster.appendChild(setElementArticle);
    const setElementDiv = document.createElement("div");
    setElementDiv.classList.add("cart__item__img");
    setElementArticle.appendChild(setElementDiv);
    const setElementImg = document.createElement("img");
    setElementImg.src = "need fetch";
    setElementImg.alt = "need fetch";
    setElementDiv.appendChild(setElementImg);
    const setElementSecondDiv = document.createElement("div");
    setElementSecondDiv.classList.add("cart__item__content");
    setElementArticle.appendChild(setElementSecondDiv);
    const setElementSecondFirstDiv = document.createElement("div");
    setElementSecondFirstDiv.classList.add("cart__item__content__description");
    setElementSecondDiv.appendChild(setElementSecondFirstDiv);
    const setElementSecondFirstDivTitle = document.createElement("h2");
    const setElementSecondFirstDivP = document.createElement("p");
    const setElementSecondFirstDivPSecond = document.createElement("p");
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
    setElementThirdFirstDivInput.value = "0";
    const setElementThirdSecondDiv = document.createElement("div");
    setElementThirdDiv.appendChild(setElementThirdSecondDiv);
    setElementThirdSecondDiv.classList.add("cart__item__content__settings__delete");
    const setElementThirdSecondDivP = document.createElement("p");
    setElementThirdSecondDivP.textContent = "Supprimer";
    setElementThirdSecondDiv.appendChild(setElementThirdSecondDivP);
    setElementThirdSecondDivP.classList.add("deleteItem");
  });*/
};

getProducts();

//console.log(obj.colors)
//console.log(obj.quantity)
/*
const iterator = obj.values();

for (const value of iterator) {
  console.log(value);
}

*/
/*
const clearLocalStorage = () => {
    localStorage.clear()
  };
clearLocalStorage();
for (var i = 0; i < localStorage.length; i++){
    console.log(localStorage.getItem("id"))
}
/*
//console.log(localStorage.key(0)); // renvoie le titre de la session nommer OBJ);

//console.log(obj)


*/
/*


const obj = {
    name: 'James',
    country: 'Chile',
  };
Object.keys(obj).forEach(key => {
    console.log(key); // 👉️ name, country
    console.log(obj[key]); // 👉️ James, Chile
  });
  // 👇️ ['name', 'country']
  console.log(Object.keys(obj));
*/
