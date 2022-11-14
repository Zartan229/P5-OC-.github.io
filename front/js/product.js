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

      //  return data;
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
};

getProducts(getId(window.location.href));

const setProduct = (products) => {

    console.log(products)
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
      products.colors.forEach(products => {
        select = document.getElementById("colors");

        var opt = document.createElement("option");
        opt.value = products
        opt.innerHTML = products
        select.appendChild(opt);
      });
    
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
