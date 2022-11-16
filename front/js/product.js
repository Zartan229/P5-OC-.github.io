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

getProducts(getId(window.location.href));

const setProduct = (products) => {
  let classImage = document.querySelector(".item__img");
  const newEltimg = document.createElement("img");
  newEltimg.src = products.imageUrl;
  newEltimg.alt = products.altTxt;
  classImage.appendChild(newEltimg);

  let eltTitle = document.getElementById("title");
  eltTitle.textContent = products.name;

  let eltPrice = document.getElementById("price");
  eltPrice.textContent = products.price;
  let eltDescription = document.getElementById("description");
  eltDescription.textContent = products.description;
  products.colors.forEach((products) => {
    select = document.getElementById("colors");

    var opt = document.createElement("option");
    opt.value = products;
    opt.innerHTML = products;
    select.appendChild(opt);
  });
};
const getColors = () => {
  var e = document.getElementById("colors");
  var value = e.value;

  return value;
};

/*
const cars = [];/*
Object.keys(a).forEach((key) => {
  i = 0;

  var arr = eval("[" + a[key] + "]");
//  console.log(arr);
//  console.log(arr[i].id);
//  console.log(arr[i].quantity);
//  console.log(arr[i].colors);
   
  
  var tab = {
    quantity: arr[i].quantity,
    id: arr[i].id,
    colors: arr[i].colors,
  };

  cars.push(tab);
 // console.log(cars);

  Object.keys(cars).forEach((keys) => {
    console.log(cars[keys].id)
    

  })
  // console.log(arr[i].id)
  // idOfProduct.push(arr[i].id);
  // console.log(idOfProduct)
  /*if(arr[i].id == idOfProduct)
  (
    console.log("Already exist")
  )
  i++;

;
});
  */
function SaveDataToLocalStorage(data) {
  var a = [];
  // Parse the serialized data back into an aray of objects
  a = JSON.parse(localStorage.getItem("obj")) || [];
  // Push the new data (whether it be an object or anything else) onto the array

  a.push(data);
  // Alert the array value
  alert(a); // Should be something like [Object array]
  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem("obj", JSON.stringify(a));
}

function dateAlreadyExist(data) {
  //console.log(data.id)
  i = 0;
  var a = [];

  a = JSON.parse(localStorage.getItem("obj")) || [];
  //  console.log(a);
  const cars = [];
  Object.keys(a).forEach((key) => {
    var arr = eval("[" + a[key] + "]");
    //  console.log(arr[i].quantity)
    //   console.log(data.colors)
    //   console.log(data.quantity)
    //   console.log(arr[i].colors)
    if (data.id === arr[i].id && data.colors === arr[i].colors) {
      console.log("EXISTE DEJA");
      console.log("COULEUR EST LA MEME");
      console.log("doit modifier la qté ici, pas d'ajout pour le moment")
      } 
      else {
        console.log("couleur différente ou id différente");
        let objLinea = JSON.stringify(data);
        SaveDataToLocalStorage(objLinea);
      }
     
    
    //arr[i].quantity = parseInt(arr[i].quantity) + parseInt(data.quantity);
    //  console.log(arr);
    //  console.log(arr[i].id);
    //  console.log(arr[i].quantity);
    //  console.log(arr[i].colors);
})};

/*
for (var i = 0; i < arr.length; i++) {
  for (var j = 0; j < arr[i].length; j++) {
    console.log(arr[i][j]);
  }*/


const saveProduct = () => {
  /*
    localStorage.setItem("quantity", document.getElementById("quantity").value) 
    console.log(localStorage.getItem("quantity"))

    localStorage.setItem("id", getId(window.location.href)) 
    console.log(localStorage.getItem("id"))

    localStorage.setItem("colors", getColors()) 
    console.log(localStorage.getItem("colors"))
    */
  let objJson = {
    quantity: document.getElementById("quantity").value,
    id: getId(window.location.href),
    colors: getColors(),
  };
  if (JSON.parse(localStorage.getItem("obj"))) {
    console.log("dataAlreadyExist");
    dateAlreadyExist(objJson);
  } else {
    console.log("DataDoesn'tAlreadyExist");
    let objLinea = JSON.stringify(objJson);

    SaveDataToLocalStorage(objLinea);
  }
  console.log("check");

  var a = [];
  a = JSON.parse(localStorage.getItem("obj")) || [];
  console.log(a);
  // localStorage.setItem("obj", objLinea);

  /*
    var e = document.getElementById("colors");
    var value = e.value;
    var text = e.options[e.selectedIndex].text;

    console.log(value)
    console.log(text)



    localStorage.setItem("colors", products.colors);
    localStorage.setItem("id", products.id);
    console.log(localStorage.getItem("id"))
    console.log(products.colors)
    console.log(localStorage.getItem("colors"))
    */
};
/*
    let eltTitle = document.getElementById("title");
    eltTitle.textContent = "NAME";
    let eltPrice = document.getElementById("price");
    eltPrice.textContent = "42";
    let eltDescription = document.getElementById("description");
    eltDescription.textContent = "WOLOLOOLO";
}
*/
