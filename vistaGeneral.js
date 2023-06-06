 const fila = document.querySelector('.contenedorCarrousel');
 const fila2 = document.querySelector('.contenedorCarrousel2');
 const videos1 = document.querySelectorAll('.video1');
 const videos2 = document.querySelectorAll('.video2');
 const videos = document.querySelectorAll('.video');

 const flechaIzquierda = document.getElementById('flecha-izquierda');
 const flechaDerecha = document.getElementById('flecha-derecha');

 const flechaIzquierda2 = document.getElementById('flecha-izquierda2');
 const flechaDerecha2 = document.getElementById('flecha-derecha2'); 
 
 // ---- ---- Event Listener para flecha derecha ---- ----

 flechaDerecha.addEventListener('click',() =>{
    fila.scrollLeft += fila.offsetWidth;

    const indicadorActivo = document.querySelector('.indicadores .activo');
    if (indicadorActivo.nextSibling){
        indicadorActivo.nextSibling.classList.add ('activo');
        indicadorActivo.classList.remove('activo');
    }
 })

 flechaDerecha2.addEventListener('click',() =>{
    fila2.scrollLeft += fila2.offsetWidth;

    const indicadorActivo = document.querySelector('.indicadores2 .activo');
    if (indicadorActivo.nextSibling){
        indicadorActivo.nextSibling.classList.add ('activo');
        indicadorActivo.classList.remove('activo');
    }
 })


 // ---- ---- Event Listener para flecha Izquierda ---- ----


 flechaIzquierda.addEventListener('click',() =>{
    fila.scrollLeft -= fila.offsetWidth;

    const indicadorActivo = document.querySelector('.indicadores .activo');
    if (indicadorActivo.previousSibling){
        indicadorActivo.previousSibling.classList.add ('activo');
        indicadorActivo.classList.remove('activo');
    }

 })

 flechaIzquierda2.addEventListener('click',() =>{
    fila2.scrollLeft -= fila2.offsetWidth;

    const indicadorActivo = document.querySelector('.indicadores2 .activo');
    if (indicadorActivo.previousSibling){
        indicadorActivo.previousSibling.classList.add ('activo');
        indicadorActivo.classList.remove('activo');
    }

 })

 // ---- ---- Pagination ---- ---- 

 const numeroPaginas = Math.ceil(videos1.length / 5);
 for (let i = 0; i < numeroPaginas; i++) { 
    const indicador = document.createElement('button');

if(i === 0){
    indicador.classList.add('activo');
}
    document.querySelector('.indicadores').appendChild(indicador);
    indicador.addEventListener('click',(e) =>{
        fila.scrollLeft = i * fila.offsetWidth;

        document.querySelector('.indicadores .activo').classList.remove ('activo');
        e.target.classList.add('activo');
   });
 }

 const numeroPaginas2 = Math.ceil(videos2.length / 5);
 for (let i = 0; i < numeroPaginas; i++) { 
    const indicador = document.createElement('button');

if(i === 0){
    indicador.classList.add('activo');
}
    document.querySelector('.indicadores2').appendChild(indicador);
    indicador.addEventListener('click',(e) =>{
        fila2.scrollLeft = i * fila2.offsetWidth;

        document.querySelector('.indicadores2 .activo').classList.remove ('activo');
        e.target.classList.add('activo');
   });
 }

 // ---- ---- Hover ---- ----

 videos.forEach((video) => {
    video.addEventListener('mouseenter', (e) => {
        const elemento = e.currentTarget;
        setTimeout(() => {
            videos1.forEach(video => video.classList.remove ('hover'))
            elemento.classList.add('hover');
        }, 10);
   })
});

fila.addEventListener('mouseleave', () => {
    videos.forEach(video => video.classList.remove ('hover'));
});


videos2.forEach((video) => {
    video.addEventListener('mouseenter', (e) => {
        const elemento = e.currentTarget;
        setTimeout(() => {
            videos2.forEach(video => video.classList.remove ('hover'))
            elemento.classList.add('hover');
        }, 10);
   })
});

fila2.addEventListener('mouseleave', () => {
    videos2.forEach(video => video.classList.remove ('hover'));
});


// ---- ---- BUSQUEDA GRID ---- ----

const searchInput = document.getElementById('search-input');
const contenedorBusqueda = document.getElementById('gridBusqueda');

searchInput.addEventListener('click', () => {
    setTimeout(() => {
        contenedorBusqueda.classList.remove('hidden');
    },100)
})

const cerrarBusqueda = document.getElementById('cerrarBusqueda');

cerrarBusqueda.addEventListener('click', () => {

    contenedorBusqueda.classList.add('hidden');

})

// ---- ---- CAMBIO DE COLOR AGREGAR PLAYLIST ---- ----

const buttonPlayList = document.querySelectorAll("#buttonPlayList");

buttonPlayList.forEach((buttonPlayList) => {
    buttonPlayList.addEventListener("click", (e) => {
        e.target.classList.toggle('filtroGris');
    })
})

// ---- ---- LISTA DE REPRODUCCION ---- ----

const cerrarListaRepro = document.getElementById('cerrarListaRepro');
const contenedorListaRepro = document.getElementById('contenedorListaRepro');
const iconListaRepro = document.getElementById('iconListaRepro');
const spanListaRepro = document.getElementById('spanListaRepro');
const blur = document.getElementById('blur');
const itemList = document.getElementById('itemList')
const divLista = document.querySelectorAll('.divLista')
const gridListaRepro = document.querySelector('.gridListaRepro')

iconListaRepro.addEventListener("click", () => {        
        contenedorListaRepro.classList.remove('hidden');
        blur.classList.add('blurListaRepro');
        setTimeout(() => {
            window.addEventListener('click' ,e=> e.target == blur && closeContenedor())
        }, 10)
    });

spanListaRepro.addEventListener("click", () => {
    contenedorListaRepro.classList.remove('hidden');
    blur.classList.add('blurListaRepro');
    setTimeout(() => {
        window.addEventListener('click' ,e=> e.target == blur && closeContenedor())
    }, 10)
})

const closeContenedor = () => {
    contenedorListaRepro.classList.add('hidden')
    blur.classList.remove('blurListaRepro');
}

cerrarListaRepro.addEventListener("click", () => closeContenedor());

// ---- ---- LISTA DE REPRODUCCION  CERRAR FUERA---- ----




// ---- ---- LISTA DE REPRODUCCION  DRAGG ORDER---- ----

divLista.forEach(divLista => {
    divLista.addEventListener("dragstart", () => {
        setTimeout(() => divLista.classList.add("dragging"), 0)
    })
    divLista.addEventListener("dragend", () => divLista.classList.remove("dragging"));
})

const initgridListaRepro = (e) => {
    e.preventDefault()

    const draggingItem = document.querySelector(".dragging")

    let siblings = [...gridListaRepro.querySelectorAll(".divLista:not(.dragging)")];

    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    gridListaRepro.insertBefore( draggingItem, nextSibling)

console.log(nextSibling);
}

gridListaRepro.addEventListener("dragover", initgridListaRepro);
gridListaRepro.addEventListener("dragenter", e => e.preventDefault());