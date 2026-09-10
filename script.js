const productSection = document.querySelector(".product-section");
const searchInput = document.querySelector(".search-input");
const category_filter = document.getElementById("category-select");
const sorting = document.getElementById("sort-select");
const pagination = document.querySelector(".pagination");
let productsPerPage = 6;
let currentPage = 1;
let allProducts = [];


////////////////////////////////////loading skeleton///


function generateSkeleton() {
  return ` <div class="card" style="width: 22rem">
  <img class='skeleton-img'/>
  <div >
    <h4 class='skeleton-hd' ></h4>
    <p class='skeleton' ></p>
    <p class='skeleton'></p> 
  </div>
</div>`;
}

////////////show skeleton
// function showSkeleton() {
//   let skeletonCard=''
//   for (let index = 1; index <= 6; index++) {
//    skeletonCard += generateSkeleton()
    
//   }
//   return skeletonCard;
// }


// productSection.innerHTML = showSkeleton()

productSection.innerHTML=[1,2,3,4,5,6].map(generateSkeleton).join('')



/////////////////////////////////////API fetching
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    allProducts = products;
    applyFilters();
    // productSection.innerHTML = allProducts.map(generateCard).join("");
  })
  .catch((error) =>{
    productSection.innerHTML = `
  <h3 class="text-center w-100">
  network error
  </h3>
`;
    
  });




  ///////////////////////////////product card

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



////////////////////////////pagination handler////////////////

function paginationHandler(e) {
  const paginationBtn = e.target;
  const paginationBtnValue = +paginationBtn.innerText;
  if (paginationBtn.classList.contains("btn")) {
    currentPage = paginationBtnValue;
    applyFilters();
    return;
  } else if (paginationBtn.classList.contains("previous")) {
    currentPage = --currentPage;
    applyFilters();
    return;
  } else if (paginationBtn.classList.contains("next")) {
    currentPage = ++currentPage;
    applyFilters();
    return;
  }
}
pagination.addEventListener("click", paginationHandler);


////////////////////compound filtering////////////////////////////////////////////////////////////
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const categoryValue = category_filter.value.toLowerCase();
  const sortingValue = sorting.value.toLowerCase();

//////////////////category & search

  const filteredProducts = allProducts.filter(
    (product) =>
      (product.title.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue)) &&
      (categoryValue === "all" ||
        product.category.toLowerCase() === categoryValue),
  );

  //////////////////////////////sorting
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
  let end = start + productsPerPage;
  let currentPageProducts = filteredProducts.slice(start, end);

  if (filteredProducts.length === 0) {
    productSection.innerHTML = `
            <h3 class="text-center w-100">
              No matching products found
            </h3>
          `;
    return;
  }

  pagination.innerHTML = "";

  pagination.innerHTML = `
  <button class="previous" ${currentPage === 1 ? "disabled" : ""}>
    previous
  </button>
`;
  
  for (let i = 1; i <= totalPages; i++) {
    let btnClass;
    i === currentPage ? btnClass= 'btn active' : btnClass= 'btn';
    pagination.innerHTML += `<button class="${btnClass}">${i}</button>`;
   
  }
    if (currentPage === totalPages) {
      pagination.innerHTML += `<button disabled class='next'>next</button>`;
    } else {
      pagination.innerHTML += `<button class='next'>next</button>`;
    }



  productSection.innerHTML = currentPageProducts.map(generateCard).join("");
}

searchInput.addEventListener("input", () => {
  currentPage = 1;
  applyFilters();
});
category_filter.addEventListener("change", () => {
  currentPage = 1;
  applyFilters();
});
sorting.addEventListener("change", () => {
  currentPage = 1;
  applyFilters();
});

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
