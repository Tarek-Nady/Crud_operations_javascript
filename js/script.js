var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var productsContainer = [];
if(localStorage.getItem('products')!=null){
    productsContainer = JSON.parse(localStorage.getItem('products'));
    displayProducts(productsContainer);
}
function addProduct(){
    var product ={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value
    }
    productsContainer.push(product);
    localStorage.setItem("products",JSON.stringify(productsContainer));
    displayProducts(productsContainer);
    clearForm();
}

function clearForm(){
    productNameInput.value ="";
    productCategoryInput.value = "";
    productPriceInput.value = "";   
    productDescInput.value = "";
}

function displayProducts(arr){
    var cartoona = ``;
    for(var i=0;i<arr.length;i++){
        cartoona+= `<tr>
        <td>${arr[i].name}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].desc}</td>
        <td><button onclick="setFormForUpdate(${i});" class="btn btn-outline-warning btn-sm">Update</button></td>
        <td><button onclick="deleteProduct(${i});" class="btn btn-outline-danger btn-sm">Delete</button></td>
        </tr>`;
    }
    document.getElementById('tableBody').innerHTML = cartoona;
   
}

function deleteProduct(productIndex){
    productsContainer.splice(productIndex,1);
    localStorage.setItem("products",JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}


function searchProducts(term){
    var matchedContainer = [];
    for(var i=0;i<productsContainer.length;i++){
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase())===true){
            matchedContainer.push(productsContainer[i]);
        }
    }
    displayProducts(matchedContainer);
}
var indexUpdate = 0;
function setFormForUpdate(i)
{
    addBtn.classList.replace('d-block','d-none');
    updateBtn.classList.replace('d-none','d-block');
    productNameInput.value = productsContainer[i].name;
    productPriceInput.value = productsContainer[i].price;
    productCategoryInput.value = productsContainer[i].category;
    productDescInput.value = productsContainer[i].desc;
    indexUpdate = i;
}
function updateProducts(){
    var product = {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value,
    }
    productsContainer.splice(indexUpdate,1,product);
    localStorage.setItem("products",JSON.stringify(productsContainer));
    displayProducts(productsContainer);
    updateBtn.classList.replace('d-block','d-none');
    addBtn.classList.replace('d-none','d-block');

}