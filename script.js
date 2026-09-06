const productSection = document.querySelector(".product-section");
const searchInput = document.querySelector(".search-input");
let allProducts = [];
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    console.log(products);
    
    allProducts = products;
    productSection.innerHTML = allProducts.map(generateCard).join("");
  });

function generateCard(product) {
  return ` <div class="card" style="width: 22rem">
        <img src="${product.image}" class="card-img-top" alt="${product.title}" />
        <div class="card-body">
          <h4 class="card-title ">${product.title}</h4>
          <p class="card-text">
           ${product.description}
          </p>
          <p class="fw-semibold">Price ${product.price}$</p> 
        </div>
      </div>`;
}
function handleInput(e) {
    const searchItem = e.target.value.toLowerCase();
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchItem),
    );
    // productSection.innerHTML = "";
  
    if (filteredProducts.length === 0) {
      productSection.innerHTML = `
        <h3 class="text-center w-100">
          No matching products found
        </h3>
      `;
      return;
    }
  
    // // filteredProducts.forEach((product) => {
    // //   productSection.innerHTML += generateCard(product);
    // });
    productSection.innerHTML = filteredProducts.map(generateCard).join("");
  }

searchInput.addEventListener("input", handleInput);

////////////////////categories filter//////////////////

const category_filter = document.getElementById("category-select");

function category_filterHandler(e) {
  const categorySelection = e.target.value.toLowerCase()

  if (categorySelection==='all') {
    productSection.innerHTML = allProducts.map(generateCard).join("");
    return
  }
    const categoryProducts = allProducts.filter((product) =>
      product.category.toLowerCase()===categorySelection
    );
  
  
  
    if (categoryProducts.length === 0) {
      productSection.innerHTML = `
        <h3 class="text-center w-100">
          No matching products found
        </h3>
      `;
      return;
  }


  productSection.innerHTML=categoryProducts.map(generateCard).join("")
  
}

category_filter.addEventListener('change',category_filterHandler)

