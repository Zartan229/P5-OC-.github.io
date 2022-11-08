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
      console.log(products);

      productsOffer(products);
      //  return data;
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
};
getProducts();

const productsOffer = (products) => {
  console.log(products[1].name);
  console.log(products[2].name);
  for (i = 0; i < 8; i++) {
    let image = 1 + i;
    let productName = products[i].name;
    let productDescription = products[i].description;
    let productAltTxt = products[i].altTxt;

    const newElta = document.createElement("a");
    newElta.href = "./product.html?id=" + products[i]._id;
    const newEltarticle = document.createElement("article");
    const newEltimg = document.createElement("img");
    newEltimg.src = "../../back/images/kanap0" + image +".jpeg";
    newEltimg.alt = productAltTxt;
    const newElth3 = document.createElement("h3");
    newElth3.classList.add("productName");
    const newEltp = document.createElement("p");
    newEltp.classList.add("productDescription");
    let elt = document.getElementById("items");
    elt.appendChild(newElta);
    newElta.appendChild(newEltarticle);
    newEltarticle.appendChild(newEltimg);
    newEltarticle.appendChild(newElth3);
    newEltarticle.appendChild(newEltp);
    newElth3.textContent = productName;
    newEltp.textContent = productDescription;
  }
};

// Retourne la promesse du fetch console.log(products)
/*
let b = document.body;
let newP = document.createElement("p");
let newTexte = document.createTextNode("texte écrit en javascript");
newP.textContent = "Paragraphe créé et inséré grâce a Javascript";

b.prepend(newP);
b.append(newTexte);

const newElta = document.createElement("a");
const newEltarticle = document.createElement("article");
const newEltimg = document.createElement("img");
newEltimg.setAttribute("src", products[0].imageUrl)

const newElth3 = document.createElement("h3");
const newEltp = document.createElement("p");
let elt = document.getElementById("items");

elt.appendChild(newElta);
newElta.classList.add("nouvelleClasse");
let eltaClass = document.getElementsByClassName("nouvelleClasse");
newElta.href = "product";
newElta.appendChild(newEltarticle);
newEltarticle.appendChild(newEltimg);
newEltarticle.appendChild(newElth3);
newElth3.classList.add("productName");
newEltarticle.appendChild(newEltp);
newEltp.classList.add("productDescription");
console.log(products);
let Productname = products[0].name;

newEltp.textContent = " nom du produit = " + Productname;
newEltarticle.append(newEltp);
*/
