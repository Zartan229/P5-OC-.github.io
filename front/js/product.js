//windows.location.href récupère l'url, qui est envoyer a getId.
//nous créons une valeur id qui va ètre le résultat de la valeur =id
//présente dans le l'url.
const getId = (url) => {
  urlRequest = new URL(url);
  let id = urlRequest.searchParams.get("id");
  return id;
};

let products = [];
//Fetch lier a getId pour récupérer spécifiquement les information dans l'API
//pour récupérer seulement les informations du canaper dont nous avons besoin
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
//Récupère les information spécifique du canaper séléctionner.
//Met en place ces donnée a travers le DOM
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
    opt.textContent = products;
    select.appendChild(opt);
  });
};
//Trouve la couleur selectionner et la renvoie
const getColors = () => {
  const colors = document.getElementById("colors");
  const value = colors.value;

  return value;
};
//Sauvegarde le produit dans le localStorage
//Créer un objet productToSave qui contient, la quantiter, l'id, et la couleur choisie.
//Initialise storage qui a les objet dans le localStorage,
//Vérifie que la quantiter, couleur soit dans des paramêtre acceptable.
//Si oui, alors on vérifie si storage contient quelque chose.
//    Si non, alors on push l'objet productToSave dans un tableau et on l'envoie dans le localStorage
//
const saveProduct = () => {
  const productToSave = {
    quantity: document.getElementById("quantity").value,
    id: getId(window.location.href),
    colors: getColors(),
  };
  let storage = JSON.parse(localStorage.getItem("obj"));
  if (productToSave.colors == "" || productToSave.quantity <= 0 || productToSave.quantity > 100) {
    alert("Veuillez choisir une couleur ou entrer une quantiter supérieur a 0 et infèrieur ou égale a 100");
    document.getElementById("quantity").value = 0;
    document.getElementById("colors").value = "";
  } else {
    // The JSON.parse() method parses a JSON string,
    // constructing the JavaScript value or object described by the string
    if (storage) {
      // Si la condition que a est initialiser alors il existe déjà des objets dans le localStorage
      // Donc on doit vérifier si il existe déja un canaper avec une couleur identique
      const productInLocalStorage = storage.find((product) => product.id == productToSave.id && product.colors == productToSave.colors);
      //La méthode find() renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument
      if (productInLocalStorage) {
        // --> on vérifier si il a trouver le localStorage dans l'exemple oui
        // Donc on prend la quaniter trouver dans le localStorage et on lui ajoute ce que l'on souhaite ajouter maintenant, donc la qté productToSave a celle déjà existante.
        productInLocalStorage.quantity = parseInt(productToSave.quantity) + parseInt(productInLocalStorage.quantity);
        // La fonction parseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée.
        //
        // On prend la quantité de produit stocker dans le productInLocalStorage et celui stocker dans l'objson et on l'ajoute a la demande existente.
        //    console.log(productInLocalStorage);
        localStorage.setItem("obj", JSON.stringify(storage));
      } else {
        storage.push(productToSave);
        localStorage.setItem("obj", JSON.stringify(storage));
      }
    } else {
      storage.push(productToSave);
      localStorage.setItem("obj", JSON.stringify(storage));
    }
  }
};

getProducts(getId(window.location.href));
