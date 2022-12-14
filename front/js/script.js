let products = [];
//getProducts récupère les données dans l'API.
//Ces données sont ensuite transposer dans productsOffer(products)
//Qui récupère l'array d'objet qui est récupérer a travers data

const getProducts = async () => {
  await fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
       // console.log(res)
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
      console.log(err)
    });
};
//productsOffer récupère l'information du fetch
//Et pour chaque élement présent dans le fetch effectue le code
//présent dans productsOffer pour afficher ces éléments.
const productsOffer = (products) => {
  products.forEach((product) => {
    const productName = product.name;
    const productDescription = product.description;
    const productAltTxt = product.altTxt;

    const newElta = document.createElement("a");
    newElta.href = "./product.html?id=" + product._id;
    const newEltarticle = document.createElement("article");
    const newEltimg = document.createElement("img");
    newEltimg.src = product.imageUrl;
    newEltimg.alt = productAltTxt;
    const newElth3 = document.createElement("h3");
    newElth3.classList.add("productName");
    const newEltp = document.createElement("p");
    newEltp.classList.add("productDescription");
    const elt = document.getElementById("items");
    elt.appendChild(newElta);
    newElta.appendChild(newEltarticle);
    newEltarticle.appendChild(newEltimg);
    newEltarticle.appendChild(newElth3);
    newEltarticle.appendChild(newEltp);
    newElth3.textContent = productName;
    newEltp.textContent = productDescription;
  });
};

getProducts();
