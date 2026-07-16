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
      image: `images/${
        productImageInput.files[0]
          ? productImageInput.files[0].name
          : "wp8896750.jpg"
      }`,
    };

    productList.push(product);
    localStorage.setItem("productContainer", JSON.stringify(productList));
    displayData();

    clearForm();
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
  var term = searchInput.value.trim();
  var regex = term ? new RegExp(term, "gi") : null;
  var categoryLabel = filteredProducts[i].category
    ? filteredProducts[i].category.toUpperCase()
    : "";
  var priceFormatted = filteredProducts[i].price
    ? "$" + parseFloat(filteredProducts[i].price).toFixed(2)
    : "";
  return `<div class="product-card">
    <div class="product-card__img-wrap">
      <img
        class="product-card__img"
        src="${filteredProducts[i].image}"
        alt="${filteredProducts[i].name}"
        onerror="this.src='images/wp8896750.jpg'"
      />
      ${categoryLabel ? `<span class="product-card__badge">${categoryLabel}</span>` : ""}
    </div>
    <div class="product-card__body">
      <div class="product-card__meta">
        <h3 class="product-card__name">${regex
          ? filteredProducts[i].name.replace(regex, (match) => `<mark class="search-highlight">${match}</mark>`)
          : filteredProducts[i].name
        }</h3>
        <span class="product-card__price">${priceFormatted}</span>
      </div>
      <p class="product-card__desc">${filteredProducts[i].description}</p>
    </div>
    <div class="product-card__footer">
      <button class="product-card__btn product-card__btn--update" onclick="setUpdateInfo(${i})">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"/>
        </svg>
        Update
      </button>
      <button class="product-card__btn product-card__btn--delete" onclick="deleteItem(${i})">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
        </svg>
      </button>
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
  // Scroll to form on mobile
  document.getElementById("addProductCard").scrollIntoView({ behavior: "smooth", block: "start" });
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
      image: `images/${
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
    clearForm();
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
