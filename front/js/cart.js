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
      

      //  return data;
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
};


//console.log(obj.getItem("id"))
//console.log(obj)

const showCart = (a, products) => {
  console.log(products)
  
  
  console.log(a)
  


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
    PrdouctDetail = products.find((prod) => a[key].id == prod._id)
    console.log(PrdouctDetail)
    if(PrdouctDetail)
    {
    console.log("trouver")
    let getElementMaster = document.getElementById("cart__items");
    const setElementArticle = document.createElement("article");
    setElementArticle.classList.add("cart__item");
    setElementArticle.dataset.id = PrdouctDetail._id
    setElementArticle.dataset.colors = a[key].colors;
    getElementMaster.appendChild(setElementArticle);
    const setElementDiv = document.createElement("div");
    setElementDiv.classList.add("cart__item__img");
    setElementArticle.appendChild(setElementDiv);
    const setElementImg = document.createElement("img");

    setElementImg.src = PrdouctDetail.imageUrl;
    setElementImg.alt = PrdouctDetail.altTxt
    setElementDiv.appendChild(setElementImg);
    }
    else{
      console.log("echec")
    }
})

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
