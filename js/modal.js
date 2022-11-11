const carritoAbrir = document.getElementById('boton-carrito');
const carritoCerrar = document.getElementById('carritoCerrar');

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

carritoAbrir.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
})
carritoCerrar.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click',(e)=>{
    e.stopPropagation()
})
contenedorModal.addEventListener('click', ()=>{
    carritoCerrar.click()
})

const btnLogin = document.getElementById("btnLogin");
    btnLogin.addEventListener("click", () => {
        Swal.fire( {
            title:"Login",
            html: `<input type="text" id="email" class="swal2-input" placeholder="Email">
            <input type="password" id="password" class="swal2-input" placeholder="Password">`,
            confirmButtonText: "Enviar",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
        }).then((result)=> {
            if(result.isConfirmed) {
                const email = document.getElementById("email").value;
                const password = document.getElementById("password").value;
                Swal.fire( {
                    title: "INICIANDO SESION",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                })
            }
            localStorage.setItem('Email ',' password',JSON.stringify(result.isConfirmed) )
        })
    })