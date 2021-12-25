function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    "shoppingCartItemTitle"
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        ".shoppingCartItemQuantity"
      );
      elementQuantity.value++;
      $(".toast").toast("show");
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement("div");
  const shoppingCartContent = `
    <div class="row shoppingCartItem">
          <div class="col-6">
              <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <img src=${itemImage} class="shopping-cart-image">
                  <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
              </div>
          </div>
          <div class="col-2">
              <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
              </div>
          </div>
          <div class="col-4">
              <div
                  class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                  <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                      value="1">
                  <button class="btn btn-danger buttonDelete" type="button">X</button>
              </div>
          </div>
      </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector(".buttonDelete")
    .addEventListener("click", removeShoppingCartItem);

  shoppingCartRow
    .querySelector(".shoppingCartItemQuantity")
    .addEventListener("change", quantityChanged);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector(".shoppingCartTotal");

  const shoppingCartItems = document.querySelectorAll(".shoppingCartItem");

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      ".shoppingCartItemPrice"
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace("$", "")
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      ".shoppingCartItemQuantity"
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(3)}`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  const button = event.target;
  const producto = button.closest(".shoppingCartItem");
  const nombreProducto = producto.querySelector(
    ".shoppingCartItemTitle"
  ).textContent;
  console.log(nombreProducto);
  localStorage.removeItem(nombreProducto);
  buttonClicked.closest(".shoppingCartItem").remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

const comprarButton = document.querySelector(".comprarButton");
comprarButton.addEventListener("click", comprarButtonClicked);

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = "";
  localStorage.clear();
  updateShoppingCartTotal();
}

function toObject(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; ++i) {
    obj = arr[i];
  }
  return obj;
}

const obtenerProductos = async () => {
  const res = await fetch("../script/productos.json");
  const data = await res.json();
  const productos = data.productos;
  return productos;
};

const shoppingCartItemsContainer = document.querySelector(
  ".shoppingCartItemsContainer"
);

window.addEventListener("DOMContentLoaded", async () => {
  const productos = await obtenerProductos();
  for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    const productoFiltrado = productos.filter(
      (producto) => producto.nombre === clave
    );
    addItemToShoppingCart(
      productoFiltrado[0].nombre,
      productoFiltrado[0].precio,
      productoFiltrado[0].imagen
    );
  }
});
