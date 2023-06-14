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

const buttonPlayList = document.querySelectorAll("#buttonPlayListIMG");
let srcButtonPlayList = document.querySelectorAll("#buttonPlayListIMG").src;


buttonPlayList.forEach((buttonPlayList) => {
    buttonPlayList.addEventListener("click", (e) => {
        if(e.target.src.match("./AssetsA3/listareproAgregarBNSVG.svg")) {
            buttonPlayList.setAttribute("src", "./AssetsA3/listareproBusqueda.svg")
        } else if(e.target.src ="./AssetsA3/listareproBusqueda.svg"){
            buttonPlayList.setAttribute("src", "./AssetsA3/listareproAgregarBNSVG.svg")
        }
    })
})

// ---- ----  VIDEO GRID BUSQUEDA  ---- ----
const imgGridBusqueda = document.querySelectorAll('.imgGridBusqueda')
const anteriorBttn = document.querySelector('.anteriorBttn')
const siguienteBttn = document.querySelector('.siguienteBttn')

imgGridBusqueda.forEach((imgGridBusqueda) => {
    imgGridBusqueda.addEventListener("click", () =>{
        videoVentana.classList.remove("hidden");
        anteriorBttn.classList.add("hidden");
        siguienteBttn.classList.add("hidden");
        bttnAgregarListaRojo.classList.remove("hidden");
        controlesVideoLocal.classList.add("hidden");
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
        }, 100)
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

// ---- ---- LISTA DE REPRODUCCION  DRAG ORDER ---- ----

Sortable.create(gridListaRepro, {
    animation:150,
    chosenClass: "seleccionado",
    ghostClass: "fantasma",
    dragClass: "drag",
})


// ---- ---- VIDEO PLAYER ---- ----

const video = document.querySelector(".videoMain");
const playButton = document.querySelector('.playVideo');
const imgPlayButton = document.querySelector('.imgPlayButton');
const progressBar = document.querySelector('.progressVideo');
const timestamp = document.querySelector(".timestamp")
const volverAVideosBttn = document.querySelectorAll(".volverAVideosVista");
const videoVentana = document.querySelector(".videoVentana")

volverAVideosBttn.forEach((volverAVideosBttn) => {
    volverAVideosBttn.addEventListener("click", () =>{
        videoVentana.classList.add("hidden");
        video.pause();
    })
})



function playPauseVideo() {
    video[video.paused ? 'play' : 'pause']()
}

function playButtonToggleIcon() {
    if(video.paused) {
        imgPlayButton.setAttribute("src", "./Assets/playSVG.svg")
    } else {
        imgPlayButton.setAttribute("src", "./Assets/pause.svg")
    }
}

function setVideoProgress () {
    video.currentTime = Number((progressBar.value * video.duration) / 100)
}

function updateVideoProgress() {
    progressBar.value = Number((video.currentTime / video.duration) * 100)
    let minutes = Math.floor(video.currentTime / 60)    
    let seconds = Math.floor(video.currentTime % 60)
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    timestamp.textContent = `${minutes}:${seconds}`
}


playButton.addEventListener("click", playPauseVideo)
video.addEventListener("click", playPauseVideo)
progressBar.addEventListener("change", setVideoProgress)
video.addEventListener("timeupdate", updateVideoProgress)

const videoPlay = document.querySelectorAll(".videoPlay")
const videoImg = document.querySelectorAll(".imgVideo")
const bttnAgregarListaRojo = document.querySelector(".bttnAgregarListaRojo")

videoPlay.forEach((videoPlay) => {
    videoPlay.addEventListener("click", () => {
        videoVentana.classList.remove("hidden");
        anteriorBttn.classList.remove("hidden");
        siguienteBttn.classList.remove("hidden");
        bttnAgregarListaRojo.classList.add("hidden");
        navControles1.classList.remove("hidden");
        controlesVideoLocal.classList.add('hidden');
    })
})

videoImg.forEach((videoImg) => {
    videoImg.addEventListener("click", () => {
        videoVentana.classList.remove("hidden");
        anteriorBttn.classList.remove("hidden");
        siguienteBttn.classList.remove("hidden");
        bttnAgregarListaRojo.classList.add("hidden");
        navControles1.classList.remove("hidden");
        controlesVideoLocal.classList.add('hidden');
    })
})

// --- ---- Bttn Volumen ---- ----

const volumenBttn = document.querySelectorAll(".volumenImg");

volumenBttn.forEach((volumenBttn) => {
    volumenBttn.addEventListener("click", (e) => { 
        if (e.target.src.match("./AssetsA3/VideosIcons/volumen.svg")) {
            volumenBttn.setAttribute("src", "./AssetsA3/VideosIcons/volumenMute.svg")
        } else {
            volumenBttn.setAttribute("src", "./AssetsA3/VideosIcons/volumen.svg")
        }
    })
})


// ---- ----  VIDEO Locales VISTA  ---- ----

const bttnCarpetaLocal = document.querySelector("#bttnCarpetaLocal");
const navControles1 = document.querySelector(".controlVideo");
const bttnTachoBlanco = document.querySelector(".bttnTachoBlanco");
const controlesVideoLocal = document.querySelector(".controlesVideoLocal");

bttnCarpetaLocal.addEventListener("click", () =>{
    videoVentana.classList.remove('hidden');
    bttnAgregarListaRojo.classList.add("hidden");
    navControles1.classList.add("hidden");
    bttnTachoBlanco.classList.add("bottom0");
    controlesVideoLocal.classList.remove("hidden");
})

// ---- ----  pantallaCompleta  ---- ----

const pantallaCompleta = document.querySelectorAll(".pantallaCompleta");
const navVideos = document.querySelector(".nav")
const seccionVideoVista = document.querySelector(".seccionVideoVista");
const seccionBusqueda = document.querySelector(".seccionBusqueda");
const seccionCarrusel = document.querySelector(".seccionCarrousel");
const seccionGrid = document.querySelector(".seccionGrid");

// pantallaCompleta.forEach((pantallaCompleta) => {
//    pantallaCompleta.addEventListener("click", () => {
//        controlesVideoLocal.classList.toggle("hidden");
//        bttnTachoBlanco.classList.toggle("hidden");
//        video.classList.add("fullscreen");
//        seccionVideoVista.classList.add("top0")
//    })
//})