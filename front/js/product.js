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
    opt.textContent = products;
    select.appendChild(opt);
  });
};

const getColors = () => {
  const colors = document.getElementById("colors");
  const value = colors.value;

  return value;
};

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
    //Récupère ce qui se trouve dans le localStorage nommer "obj"
    //Stocke dans une valeur nommer a après avoir transformer la suite de string en objet

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
    if (storage) {
      // Si la condition que a est initialiser alors il existe déjà des objets dans le localStorage
      // Donc on doit vérifier si il existe déja un canaper avec une couleur identique
      const productInLocalStorage = storage.find((product) => product.id == productToSave.id && product.colors == productToSave.colors);
      //La méthode find() renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument
      // Donc dans ce cas ci
      // Si dans a se trouve déja un élément qui possède l'id et la couleur de l'objson que l'on éssaye d'implémenter alors il intialise productInLocalStorage avec la suite trouver
      //Si un élément est trouvé, find retourne immédiatement la valeur de l'élément.
      // Exemple si a.find((product) => product.id == productToSave.id && product.colors == productToSave.colors) trouve
      // qté : 2 ; id : "107fb5b75607497b96722bda5b504926" ; colors : blue ;
      // C'est qu'il est présent dans le localStorage donc -->

      if (productInLocalStorage) {
        // --> on vérifier si il a trouver le localStorage dans l'exemple oui
        // Donc on prend la quaniter trouver dans le localStorage et on lui ajoute ce que l'on souhaite ajouter maintenant, donc la qté productToSave a celle déjà existante.
        // comme productInLocalStorage stock le a.find on peut modifier la quantité dans le localStorage a travers productInLocalStorage qui peut travailler sur le a
        // modifier la quantité dans le ProductInLocalStorage correspond a modifier celle dans le a trouver.
        // Si un élément correspondant a au canaper entrain d'ètre initialiser on n'ajoute pas ce dit canaper.
        productInLocalStorage.quantity = parseInt(productToSave.quantity) + parseInt(productInLocalStorage.quantity);
        // La fonction parseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée.
        //
        // On prend la quantité de produit stocker dans le productInLocalStorage et celui stocker dans l'objson et on l'ajoute a la demande existente.
        //    console.log(productInLocalStorage);
        localStorage.setItem("obj", JSON.stringify(storage));
      } else {
        storage.push(productToSave);
        localStorage.setItem("obj", JSON.stringify(storage));
        //The function and syntax of find() is very much like the Array.filter
        //method, except it only returns a single element. Another difference is when nothing is found,
        // this method returns a value of undefined.
        //    console.log(productInLocalStorage);
        //Si a.find ne trouve pas un produit correspondant sur la couleurs et id,
        // il renvoit undefined et ajoute le produit
      }
    } else {
      storage = [];
      storage.push(productToSave);
      localStorage.setItem("obj", JSON.stringify(storage));
      console.log(storage);
      //   console.log("no");
      //  console.log(a);
    }
    console.log(storage);
  }
  console.log(storage);
};

getProducts(getId(window.location.href));
