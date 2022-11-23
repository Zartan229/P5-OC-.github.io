const getId = (url) => {
  urlRequest = new URL(url);
  var id = urlRequest.searchParams.get("id");
  return id;
};

let products = [];
const getProducts = async (id) => {
  await fetch("http://localhost:3000/api/products/" + id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })

    .then((data) => {
      products = data;

      setProduct(products);
      document.getElementById("addToCart").addEventListener("click", saveProduct);

      //  return data;
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
};

const setProduct = (products) => {
  const classImage = document.querySelector(".item__img");
  const newEltimg = document.createElement("img");
  newEltimg.src = products.imageUrl;
  newEltimg.alt = products.altTxt;
  classImage.appendChild(newEltimg);

  const eltTitle = document.getElementById("title");
  eltTitle.textContent = products.name;

  const eltPrice = document.getElementById("price");
  eltPrice.textContent = products.price;
  const eltDescription = document.getElementById("description");
  eltDescription.textContent = products.description;
  products.colors.forEach((products) => {
    select = document.getElementById("colors");

    const opt = document.createElement("option");
    opt.value = products;
    opt.innerHTML = products;
    select.appendChild(opt);
  });
};

const getColors = () => {
  const e = document.getElementById("colors");
  const value = e.value;

  return value;
};

const saveProduct = () => {
  const objJson = {
    quantity: document.getElementById("quantity").value,
    id: getId(window.location.href),
    colors: getColors(),
  };
  //Récupère ce qui se trouve dans le localStorage nommer "obj"
  //Stocke dans une valeur nommer a après avoir transformer la suite de string en objet
  let a = JSON.parse(localStorage.getItem("obj"));
  // The JSON.parse() method parses a JSON string,
  // constructing the JavaScript value or object described by the string
  // si rien ne se trouve elle est définit en tant que nulle

  //const json = '{"result":true, "count":42}';
  //const obj = JSON.parse(json);
  //console.log(obj.count);
  // expected output: 42
  //console.log(obj.result);
  // expected output: true
  // console.log(a)
  if (a) {
    // Si la condition que a est initialiser alors il existe déjà des objets dans le localStorage
    // Donc on doit vérifier si il existe déja un canaper avec une couleur identique
    const productInLocalStorage = a.find((product) => product.id == objJson.id && product.colors == objJson.colors);
    //La méthode find() renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument
    // Donc dans ce cas ci
    // Si dans a se trouve déja un élément qui possède l'id et la couleur de l'objson que l'on éssaye d'implémenter alors il intialise productInLocalStorage avec la suite trouver
    //Si un élément est trouvé, find retourne immédiatement la valeur de l'élément.
    // Exemple si a.find((product) => product.id == objJson.id && product.colors == objJson.colors) trouve
    // qté : 2 ; id : "107fb5b75607497b96722bda5b504926" ; colors : blue ;
    // C'est qu'il est présent dans le localStorage donc -->

    if (productInLocalStorage) {
      // --> on vérifier si il a trouver le localStorage dans l'exemple oui
      // Donc on prend la quaniter trouver dans le localStorage et on lui ajoute ce que l'on souhaite ajouter maintenant, donc la qté objJson a celle déjà existante.
      // comme productInLocalStorage stock le a.find on peut modifier la quantité dans le localStorage a travers productInLocalStorage qui peut travailler sur le a
      // modifier la quantité dans le ProductInLocalStorage correspond a modifier celle dans le a trouver.
      // Si un élément correspondant a au canaper entrain d'ètre initialiser on n'ajoute pas ce dit canaper.
      productInLocalStorage.quantity = parseInt(objJson.quantity) + parseInt(productInLocalStorage.quantity);
      // La fonction parseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée.
      //
      // On prend la quantité de produit stocker dans le productInLocalStorage et celui stocker dans l'objson et on l'ajoute a la demande existente.
      //    console.log(productInLocalStorage);
      localStorage.setItem("obj", JSON.stringify(a));
    } else {
      a.push(objJson);
      localStorage.setItem("obj", JSON.stringify(a));
      //The function and syntax of find() is very much like the Array.filter
      //method, except it only returns a single element. Another difference is when nothing is found,
      // this method returns a value of undefined.
      //    console.log(productInLocalStorage);
      //Si a.find ne trouve pas un produit correspondant sur la couleurs et id,
      // il renvoit undefined et ajoute le produit
    }
  } else {
    a = [];
    a.push(objJson);
    localStorage.setItem("obj", JSON.stringify(a));
    console.log(a);
    //   console.log("no");
    //  console.log(a);
  }
  console.log(a);
};

getProducts(getId(window.location.href));
