const productSection = document.querySelector(".product-section");
const searchInput = document.querySelector(".search-input");
const category_filter = document.getElementById("category-select");
const sorting = document.getElementById("sort-select");
const pagination = document.querySelector('.pagination');
let productsPerPage = 6;
let currentPage = 1;

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

////////////////////compound filtering///////////////////
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const categoryValue = category_filter.value.toLowerCase();
  const sortingValue = sorting.value.toLowerCase();
  
  console.log("All products:", allProducts.length);
  const filteredProducts = allProducts.filter(
    (product) =>
      (product.title.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue)) &&
      (categoryValue === "all" ||
        product.category.toLowerCase() === categoryValue),
  );

  if (sortingValue === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortingValue === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortingValue === "name-a-z") {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortingValue === "name-z-a") {
    filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  ////////////////pagination////
 
  let totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  let start = (currentPage - 1) * productsPerPage;
  let end=start+productsPerPage
let currentPageProducts=filteredProducts.slice(start,end)

  if (filteredProducts.length === 0) {
    productSection.innerHTML = `
            <h3 class="text-center w-100">
              No matching products found
            </h3>
          `;
    return;
  }

  productSection.innerHTML = currentPageProducts.map(generateCard).join("");
}

searchInput.addEventListener("input", applyFilters);
category_filter.addEventListener("change", applyFilters);
sorting.addEventListener("change", applyFilters);



// function handleInput(e) {
//     const searchItem = e.target.value.toLowerCase();
//     const filteredProducts = allProducts.filter((product) =>
//       product.title.toLowerCase().includes(searchItem),
//     );
//     // productSection.innerHTML = "";

//     if (filteredProducts.length === 0) {
//       productSection.innerHTML = `
//         <h3 class="text-center w-100">
//           No matching products found
//         </h3>
//       `;
//       return;
//     }

//     // // filteredProducts.forEach((product) => {
//     // //   productSection.innerHTML += generateCard(product);
//     // });
//     productSection.innerHTML = filteredProducts.map(generateCard).join("");
//   }



////////////////////categories filter//////////////////

// function category_filterHandler(e) {
//   const categorySelection = e.target.value.toLowerCase()
// const searchValue=searchInput.value.toLowerCase()
//   // if (categorySelection==='all' ) {
//   //   productSection.innerHTML = allProducts.map(generateCard).join("");
//   //   return
//   // }
//     const categoryProducts = allProducts.filter((product) =>
//     product.category.toLowerCase()===categorySelection)
//     );

//     if (categoryProducts.length === 0) {
//       productSection.innerHTML = `
//         <h3 class="text-center w-100">
//           No matching products found
//         </h3>
//       `;
//       return;
//   }

//   productSection.innerHTML=categoryProducts.map(generateCard).join("")

// }


