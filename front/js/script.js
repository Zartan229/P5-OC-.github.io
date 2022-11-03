let products = []


fetch("http://localhost:3000/api/products/")

   .then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
  })

  .then(data => {
    products = data;
    console.log(products)
   })
  .catch(function(err) {
    // Une erreur est survenue
  });
let b = document.body;
let newP = document.createElement('p');
let newTexte = document.createTextNode('texte écrit en javascript')
newP.textContent = 'Paragraphe créé et inséré grâce a Javascript';

b.prepend(newP);
b.append(newTexte);

const newEltdiv = document.createElement("div");
const newElta = document.createElement("a");
let elt = document.getElementById("items");

elt.appendChild(newEltdiv);
newEltdiv.appendChild(newElta);