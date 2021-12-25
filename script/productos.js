const obtenerProductos = async () => {
  const res = await fetch("../script/productos.json");
  const data = await res.json();
  const productos = data.productos;
  return productos;
};

// MOSTRAR PRODUCTOS

const mostrarProductos = (productos, centro) => {
  for (producto of productos) {
    const productDiv = document.createElement("div");
    let contenedor = `
        <div class="product">
        <div class="product-header">
          <img class="producto-imagen" src="${producto.imagen}" alt="product">
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
      </div>`;
    productDiv.innerHTML = contenedor;
    centro.append(productDiv);

    productDiv.querySelector(".addToCart").addEventListener("click", añadirCarrito);
    productDiv.querySelector(".verDetalles").addEventListener("click", verDetalles);
  }
};

// Filtro
const contenedorOrdenar = document.querySelector(".ordenar-categoria");
const centroProductos = document.querySelector(".centro-producto");
const filtrarBtn = [...document.querySelectorAll(".boton-filtrar")];

if (contenedorOrdenar) {
  contenedorOrdenar.addEventListener("click", async (e) => {
    const target = e.target.closest(".seccion-titulo");
    if (!target) return;
    const id = target.dataset.id;
    const productos = await obtenerProductos();

    if (id) {
      filtrarBtn.forEach((btn) => {
        btn.classList.remove("active");
      });
      target.classList.add("active");
      const menu = productos.filter((producto) => producto.categoria === id);
      centroProductos.classList.add("animate__animated", "animate__backInUp");
      setTimeout(() => {
        centroProductos.classList.remove(
          "animate__animated",
          "animate__backInUp"
        );
      }, 1000);
      limpiarProductos(centroProductos)
      mostrarProductos(menu, centroProductos);
    }
  });
}
const filterArray = async (tipo) => {
  const productos = await obtenerProductos();
  return productos.filter((producto) => producto.categoria === tipo);
};
const tienda = document.querySelector(".centro-tienda");
const ultimos = document.querySelector(".centro-ultimo");
const vistos = document.querySelector(".vistos");

window.addEventListener("DOMContentLoaded", async () => {
  const productos = await obtenerProductos();
  const productoDefault = await filterArray("rostro");
  const ultimosProductos = await filterArray("ultimos");
  const productosVistos = await filterArray("vistos");
  mostrarProductos(ultimosProductos, ultimos);
  mostrarProductos(productoDefault, centroProductos);
  mostrarProductos(productos, tienda);
  mostrarProductos(productosVistos, vistos);
});


function añadirCarrito(event) {  
  const button = event.target;  
  const itemProducto = button.closest(".product");
  const nombreProducto = itemProducto.querySelector(".producto-nombre").textContent;
  localStorage.setItem(nombreProducto, nombreProducto);}

function verDetalles(event) {  
  const button = event.target;  
  const itemProducto = button.closest(".product");
  const nombreProducto = itemProducto.querySelector(".producto-nombre").textContent;
  const imagenProducto = itemProducto.querySelector(".producto-imagen").src;
  const precioProducto = itemProducto.querySelector(".precio-producto").textContent;
  sessionStorage.clear();
  sessionStorage.setItem(nombreProducto, [nombreProducto,imagenProducto,precioProducto]);}



function limpiarProductos(centro){
  centro.innerHTML="";
};