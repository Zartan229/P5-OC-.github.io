obj = JSON.parse(localStorage.getItem("obj")) || [];
//console.log(obj.getItem("id"))
console.log(obj)




Object.keys(obj).forEach(key => {
    console.log(obj[key]);
})


//console.log(obj.colors)
//console.log(obj.quantity)
/*
const iterator = obj.values();

for (const value of iterator) {
  console.log(value);
}

*/
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
  