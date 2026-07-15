// Inputs
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productCategoryInput = document.getElementById("productCategory");
const productDescriptionInput = document.getElementById("productDescription");
const productImageInput = document.getElementById("productImage");
const searchInput = document.getElementById("searchInput");
const btnAdd = document.getElementById("btnAdd");
const btnUpdate = document.getElementById("btnUpdate");

var productList;
var filteredProducts
if (localStorage.getItem("productContainer")) {
  productList = JSON.parse(localStorage.getItem("productContainer"));
} else {
  productList = [];
}
const rowData = document.getElementById("rowData");
displayData();

var currentIndex = 0;

function addProduct() {
  var product = {
    name: productNameInput.value.trim(),
    price: productPriceInput.value,
    category: productCategoryInput.value.trim(),
    description: productDescriptionInput.value.trim(),
    image: `/images/${
      productImageInput.files[0]
        ? productImageInput.files[0].name
        : "wp8896750.jpg"
    }`,
  };

  productList.push(product);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();

  // clearForm();
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;
}

function displayData() {
  var term = searchInput.value;
   filteredProducts = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      filteredProducts.push(productList[i]);
    }
  }

  var box = "";
  for (var i = 0; i < filteredProducts.length; i++) {
    box += createCols(i);
  }

  rowData.innerHTML = box;
}

function createCols(i){
  var regex = new RegExp(searchInput.value, "gi");
  return `<div class="col-md-3 ">
  <div class="card text-center h-100">
  <img class="card-img-top" src=${filteredProducts[i].image} style="height:300" alt="Title" />
  <div class="card-body text-center">
  <span class="bg-info p-1 rounded-pill d-block w-50 mx-auto">index : ${i}</span>
  <h3 class="card-title">${filteredProducts[i].name.replace(regex, (match)=> `<span class="bg-info rounded">${match}</span>`)}</h3>
  <p class="card-text">${filteredProducts[i].price}</p>
  <p class="card-text">${filteredProducts[i].category}</p>
  <p class="card-text">${filteredProducts[i].description}</p>
  </div>
  <div class="card-footer text-center">
  <button class="btn btn-outline-danger btn-sm" onclick="deleteItem(${i})">Delete</button>
  <button class="btn btn-outline-warning btn-sm" onClick="setUpdateInfo(${i})" >Update</button>
  </div>
  </div>
  </div>`
}

function deleteItem(i) {
  productList.splice(i, 1);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();
}

function setUpdateInfo(i) {
  productNameInput.value = productList[i].name;
  productPriceInput.value = productList[i].price;
  productCategoryInput.value = productList[i].category;
  productDescriptionInput.value = productList[i].description;
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
  currentIndex = i;
}

function updateProduct() {
  var product = {
    name: productNameInput.value.trim(),
    price: productPriceInput.value,
    category: productCategoryInput.value.trim(),
    description: productDescriptionInput.value.trim(),
    image: `/images/${
      productImageInput.files[0]
        ? productImageInput.files[0].name
        : "wp8896750.jpg"
    }`,
  };

  productList.splice(currentIndex, 1, product);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
}
