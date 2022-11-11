
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("contenedor-productos")
const filtrar = () =>{
    resultado.innerHTML ='';
        const texto = formulario.value.toLowerCase();
        let arr = []
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
            arr.push(item)
            }
    mostrarProductos(arr)
    }
        if(resultado.innerHTML == ''){
            resultado.innerHTML =`<li>Producto no encontrado</li>`
        }
}
formulario.addEventListener('keyup', filtrar);
filtrar();
mostrarProductos(productos)