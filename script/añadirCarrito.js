// PRODUCTOS
const obtenerProductos = async () => {
  const res = await fetch("../script/productos.json");
  const data = await res.json();
  const productos = data.productos;
  return productos;
};


function addToCartClicked(event) {
  const button = event.target;
  const producto = button.closest(".product");
  const nombreProducto = producto.querySelector(".producto-nombre").textContent;
  localStorage.setItem(nombreProducto, nombreProducto);
}

const mostrarDetalleProducto = (producto) => {
  const centro = document.querySelector(".product-detail");
  centro.innerHTML = "";
  const productDiv = document.createElement("div");
  let contenedor = `<div class="details container-md product">
    <div class="left">
        <div class="main">
            <img src="${producto.imagen}" alt="">
        </div>
    </div>
    <div class="right">
        <span>${producto.categoria}</span>
        <h1 class="producto-nombre">${producto.nombre}</h1>
        <div class="price">$${producto.precio}</div>
        <div class="form">                        
        <button class="addToCart addCart" href="" data-toggle="modal" data-target="#carritoModal">               
          Añadir al carrito         
        </button>
        </div>
        <h3>Detalles del producto</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero minima delectus nulla voluptates
            nesciunt
            quidem laudantium, quisquam voluptas facilis dicta in explicabo, laboriosam ipsam suscipit!</p>
    </div>
</div>`;

  productDiv.innerHTML = contenedor;
  centro.append(productDiv);

  productDiv
    .querySelector(".addToCart")
    .addEventListener("click", addToCartClicked);
};

const mostrarRelacionados = (productos) => {
  const centro = document.querySelector(".relacionados");
  centro.innerHTML = "";
  for (producto of productos) {
    const productDiv = document.createElement("div");
    let contenedor = `<div class="product">
        <div class="product-header">
          <img class="producto-imagen" src="${producto.imagen}" alt=""/>
        </div>
        <div class="product-footer">
          <h3 class="producto-nombre">${producto.nombre}</h3>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <div class="product-price">
            <h4 class="precio-producto">$${producto.precio}</h4>
          </div>
        </div>
        <ul>
          <li>
            <button class="verDetalles" onclick="location.href='detalleProducto.html'">
              <i class="fas fa-grin-hearts"></i>
            </button>
          </li>
          <li>
            <button class="addToCart" href="" data-toggle="modal" data-target="#carritoModal">                       
              <i class="fas fa-shopping-cart"></i>            
            </button>
          </li>
          <li>
            <button href="#">
              <i class="fas fa-sync"></i>
            </button>
          </li>
        </ul>
        </div>
        `;
    productDiv.innerHTML = contenedor;
    centro.append(productDiv);

    productDiv
      .querySelector(".addToCart")
      .addEventListener("click", addToCartClicked);
    productDiv
      .querySelector(".verDetalles")
      .addEventListener("click", masDetalles);
  }
};

function getClave() {
  for (let i = 0; i < sessionStorage.length; i++) {
    if (sessionStorage.key(i) != "IsThisFirstTime_Log_From_LiveServer") {
      let clave = sessionStorage.key(i);
      return clave;
    }
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const productos = await obtenerProductos();
  clave = getClave();
  const productoFiltrado = productos.filter(
    (producto) => producto.nombre === clave
  );
  console.log(productoFiltrado);
  const productosRelacionados = productos.filter(
    (producto) => producto.categoria === productoFiltrado[0].categoria
  );
  console.log(productosRelacionados);
  mostrarDetalleProducto(productoFiltrado[0]);
  mostrarRelacionados(productosRelacionados);
});

function masDetalles(event) {
  const button = event.target;
  const itemProducto = button.closest(".product");
  const nombreProducto =
    itemProducto.querySelector(".producto-nombre").textContent;
  const imagenProducto = itemProducto.querySelector(".producto-imagen").src;
  const precioProducto =
    itemProducto.querySelector(".precio-producto").textContent;
  sessionStorage.clear();
  sessionStorage.setItem(nombreProducto, [
    nombreProducto,
    imagenProducto,
    precioProducto,
  ]);
}
