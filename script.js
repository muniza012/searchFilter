const productSection = document.querySelector(".product-section");
const searchInput = document.querySelector(".search-input");
let allProducts = [];
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
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

searchInput.addEventListener("input", handleInput);
function handleInput(e) {
  const searchItem = e.target.value.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchItem),
  );
  productSection.innerHTML = "";

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
