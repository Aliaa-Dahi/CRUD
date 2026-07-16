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
var filteredProducts;
if (localStorage.getItem("productContainer")) {
  productList = JSON.parse(localStorage.getItem("productContainer"));
} else {
  productList = [];
}
const rowData = document.getElementById("rowData");
displayData();

var currentIndex = 0;

function addProduct() {
  if (
    validationInputs(productNameInput, "msgName") &&
    validationInputs(productPriceInput, "msgPrice") &&
    validationInputs(productCategoryInput, "msgCategory") &&
    validationInputs(productDescriptionInput, "msgDescription") &&
    validationInputs(productImageInput, "msgImage")
  ) {
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
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;

  productNameInput.classList.remove("is-valid", "is-invalid");
  productPriceInput.classList.remove("is-valid", "is-invalid");
  productCategoryInput.classList.remove("is-valid", "is-invalid");
  productDescriptionInput.classList.remove("is-valid", "is-invalid");
  productImageInput.classList.remove("is-valid", "is-invalid");
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

function createCols(i) {
  var regex = new RegExp(searchInput.value, "gi");
  return `<div class="col-md-3 ">
  <div class="card text-center h-100">
  <img class="card-img-top" src=${
    filteredProducts[i].image
  } style="height:300" alt="Title" />
  <div class="card-body text-center">
  <span class="bg-info p-1 rounded-pill d-block w-50 mx-auto">index : ${i}</span>
  <h3 class="card-title">${filteredProducts[i].name.replace(
    regex,
    (match) => `<span class="bg-info rounded">${match}</span>`
  )}</h3>
  <p class="card-text">${filteredProducts[i].price}</p>
  <p class="card-text">${filteredProducts[i].category}</p>
  <p class="card-text">${filteredProducts[i].description}</p>
  </div>
  <div class="card-footer text-center">
  <button class="btn btn-outline-danger btn-sm" onclick="deleteItem(${i})">Delete</button>
  <button class="btn btn-outline-warning btn-sm" onClick="setUpdateInfo(${i})" >Update</button>
  </div>
  </div>
  </div>`;
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
  if (
    validationInputs(productNameInput, "msgName") &&
    validationInputs(productPriceInput, "msgPrice") &&
    validationInputs(productCategoryInput, "msgCategory") &&
    validationInputs(productDescriptionInput, "msgDescription") &&
    validationInputs(productImageInput, "msgImage")
  ) {
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
}

// validation
function validationName() {
  var regex = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/;
  var text = productNameInput.value;
  const msgName = document.getElementById("msgName");
  if (regex.test(text)) {
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    msgName.classList.add("d-none");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    msgName.classList.remove("d-none");
    // btnAdd.classList.add("disabled");
    return false;
  }
}

function validationPrice() {
  var regex = /^\d{1,10}(\.\d{1,2})?$/;
  var text = productPriceInput.value;
  const msgPrice = document.getElementById("msgPrice");
  if (regex.test(text)) {
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    msgPrice.classList.add("d-none");
    return true;
  } else {
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
    msgPrice.classList.remove("d-none");
    // btnAdd.classList.add("disabled");
    return false;
  }
}

function validationCategory() {
  var regex = /^(tv|mobile|screens|electronics)$/i;
  var text = productCategoryInput.value;
  const msgCategory = document.getElementById("msgCategory");
  if (regex.test(text)) {
    productCategoryInput.classList.add("is-valid");
    productCategoryInput.classList.remove("is-invalid");
    msgCategory.classList.add("d-none");
    return true;
  } else {
    productCategoryInput.classList.add("is-invalid");
    productCategoryInput.classList.remove("is-valid");
    msgCategory.classList.remove("d-none");
    // btnAdd.classList.add("disabled");
    return false;
  }
}

function validationDescription() {
  var regex = /^.{3,}$/m;
  var text = productDescriptionInput.value;
  const msgDescription = document.getElementById("msgDescription");
  if (regex.test(text)) {
    productDescriptionInput.classList.add("is-valid");
    productDescriptionInput.classList.remove("is-invalid");
    msgDescription.classList.add("d-none");
    return true;
  } else {
    productDescriptionInput.classList.add("is-invalid");
    productDescriptionInput.classList.remove("is-valid");
    msgDescription.classList.remove("d-none");
    // btnAdd.classList.add("disabled");
    return false;
  }
}

function validationImage() {
  var regex = /^.{1,}\.(jpg|png|avif|jpeg|svg)$/;
  var text = productImageInput.value;
  const msgImage = document.getElementById("msgImage");
  if (regex.test(text)) {
    productImageInput.classList.add("is-valid");
    productImageInput.classList.remove("is-invalid");
    msgImage.classList.add("d-none");
    return true;
  } else {
    productImageInput.classList.add("is-invalid");
    productImageInput.classList.remove("is-valid");
    msgImage.classList.remove("d-none");
    // btnAdd.classList.add("disabled");
    return false;
  }
}

function validationInputs(element, msgId) {
  const regex = {
    productName: /^[a-zA-Z][a-zA-Z0-9]{2,19}$/,
    productPrice: /^\d{1,10}(\.\d{1,2})?$/,
    productCategory: /^(tv|mobile|screens|electronics)$/i,
    productDescription: /^.{3,}$/m,
    productImage: /^.{1,}\.(jpg|png|avif|jpeg|svg)$/,
  };
  // var regex = /^.{1,}\.(jpg|png|avif|jpeg|svg)$/;
  var text = element.value;
  const msg = document.getElementById(msgId);
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.remove("d-none");
    // btnAdd.classList.add("disabled");
    return false;
  }
}
