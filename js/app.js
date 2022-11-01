
let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonTerminar = document.getElementById('terminar')
const finCompra = document.getElementById('fin-compra')

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecProduc  = document.getElementById('selecProduc')
const buscador = document.getElementById('search')

//filtro

selecProduc.addEventListener('change',()=>{
    console.log(selecProduc.value);
    if(selecProduc.value == 'todos'){
        mostrarProductos(productos)
    }else{
        mostrarProductos(productos.filter(elemento => elemento.nombre == selecProduc.value))
    }
})

//Buscador

const formulario = document.getElementById("formulario");
const resultado = document.getElementById("contenedor-productos")

const filtrar = () =>{
    /* console.log(formulario.value); */
    resultado.innerHTML ='';

    const texto = formulario.value.toLowerCase();

    for( let item of productos){
        let nombre = item.nombre.toLowerCase();
        if (nombre.indexOf(texto) !== -1){
            resultado.innerHTML += `
            <div  class="producto">
            <div class="card">
            <div class="card-image">
                <img src=${item.img}>
                <span class="card-title">${item.nombre}</span>
                <a  id="Agregar${item.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></a>
            </div>
            <div class="card-content">
                <p>${item.desc}</p>
                <p>Marca: ${item.marca}</p>
                <p> $${item.precio}</p>
            </div>
        </div>
        </div>
            `
        }
    }
    if(resultado.innerHTML == ''){
        resultado.innerHTML =`<li>Producto no encontrado</li>`
    }
}

formulario.addEventListener('keyup', filtrar);

filtrar();

mostrarProductos(productos)



//logica Ecommerce
function mostrarProductos(array){
    contenedorProductos.innerHTML= ""
    
    array.forEach(item => {

        let div = document.createElement('div')
        div.classList.add('producto')
    div.innerHTML += `

                    <div class="card">
                        <div class="card-image">
                            <img src=${item.img}>
                            <span class="card-title">${item.nombre}</span>
                            <a  id="agregar${item.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></a>
                        </div>
                        <div class="card-content">
                            <p>${item.desc}</p>
                            <p>Marca: ${item.marca}</p>
                            <p> $${item.precio}</p>
                        </div>
                    </div>
    `
    contenedorProductos.appendChild(div)

        let btnAgregar = document.getElementById(`agregar${item.id}`)

        btnAgregar.addEventListener('click',()=>{
            agregarAlCarrito(item.id)
            let productoAgregar = productos.find(elemento => elemento.id == item.id)
            localStorage.setItem('producto',JSON.stringify(productoAgregar))
        })

    })
}


function agregarAlCarrito(id) {
    let yaEsta = carritoDeCompras.find(item=> item.id == id)
    if(yaEsta){
        yaEsta.cantidad = yaEsta.cantidad + 1
        document.getElementById(`und${yaEsta.id}`).innerHTML =` <p id=und${yaEsta.id}>Und:${yaEsta.cantidad}</p>`
        actualizarCarrito()
    }else{
        let productoAgregar = productos.find(elemento => elemento.id == id)
    
        productoAgregar.cantidad = 1
        
        carritoDeCompras.push(productoAgregar)
        
        actualizarCarrito()

        mostrarCarrito(productoAgregar) 
    }

    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
    
}


function mostrarCarrito(productoAgregar) {

    let div = document.createElement('div')
    div.className = 'productoEnCarrito'
    div.innerHTML=`
                    <p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <p id="und${productoAgregar.id}">Und:${productoAgregar.cantidad}</p>
                    <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
    `
    contenedorCarrito.appendChild(div);

    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

    btnEliminar.addEventListener('click',()=>{
        if(productoAgregar.cantidad == 1){
            btnEliminar.parentElement.remove()
            carritoDeCompras = carritoDeCompras.filter(item=> item.id != productoAgregar.id)
            actualizarCarrito()
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
        }else{
            productoAgregar.cantidad = productoAgregar.cantidad - 1
            document.getElementById(`und${productoAgregar.id}`).innerHTML =` <p id=und${productoAgregar.id}>Und:${productoAgregar.cantidad}</p>`
            actualizarCarrito()
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
            }
        

    })


}



function  actualizarCarrito (){
    contadorCarrito.innerText = [...carritoDeCompras].reduce((acc,el)=> acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0)
}




function recuperar() {
    let recuperarLS = JSON.parse(localStorage.getItem('carrito'))

    if(recuperarLS){
        recuperarLS.forEach(el=> {
            mostrarCarrito(el)
            carritoDeCompras.push(el)
            actualizarCarrito()
        })
    }


}


recuperar()




