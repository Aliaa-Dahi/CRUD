// Inputs
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productCategoryInput = document.getElementById("productCategory");
const productDescriptionInput = document.getElementById("productDescription");
const productImageInput = document.getElementById("productImage");

const productList = [];
const rowData = document.getElementById("rowData");

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: "/images/wp8896750.jpg",
  };

  productList.push(product);

  console.log(productList);
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
  var box = "";
  for (var i = 0; i < productList.length; i++) {
    box += `<div class="col-md-3">
    <div class="card text-start">
    <img class="card-img-top" src="images/wp8896750.jpg" alt="Title" />
    <div class="card-body text-center">
    <span class="bg-info p-1 rounded-pill d-block w-50 mx-auto">index : ${i}</span>
    <h3 class="card-title">${productList[i].name}</h3>
    <p class="card-text">${productList[i].price}</p>
    <p class="card-text">${productList[i].category}</p>
    <p class="card-text">${productList[i].description}</p>
    </div>
    <div class="card-footer text-center">
    <button class="btn btn-outline-danger btn-sm">Delete</button>
    <button class="btn btn-outline-warning btn-sm">Update</button>
    </div>
    </div>
    </div>`;
  }

  rowData.innerHTML = box;
}
