const getId = (url) => {
  urlRequest = new URL(url);
  var id = urlRequest.searchParams.get("id");
  return id;
};

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
      setProduct(getId(window.location.href));

      //  return data;
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
};

getProducts();
const setProduct = (id) => {
  for (i = 0; i < 8; i++) {
    let productId = products[i]._id;
    image = i + 1;
    if (productId == id) {

      let classImage = document.querySelector(".item__img");
      const newEltimg = document.createElement("img");
      newEltimg.src = "../../back/images/kanap0" + image +".jpeg";
      newEltimg.alt = products[i].altTxt;
      classImage.appendChild(newEltimg);

      let eltTitle = document.getElementById("title");
      eltTitle.textContent = products[i].name;

      let eltPrice = document.getElementById("price");
      eltPrice.textContent = products[i].price;
      let eltDescription = document.getElementById("description");
      eltDescription.textContent = products[i].description;
      for (y = 0; y < 5; y++) {
        productColor = products[i].colors[y];
        console.log(productColor);

        select = document.getElementById("colors");

        var opt = document.createElement("option");
        opt.value = products[i].colors[y];
        opt.innerHTML = products[i].colors[y];
        select.appendChild(opt);
      }
    }
  }
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
