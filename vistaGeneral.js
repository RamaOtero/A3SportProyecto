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
        seccionGrid.classList.remove('hidden');
    },100)
})

const cerrarBusqueda = document.getElementById('cerrarBusqueda');

cerrarBusqueda.addEventListener('click', () => {

    contenedorBusqueda.classList.add('hidden');
    seccionGrid.classList.add('hidden');

})

// ---- ---- CAMBIO DE COLOR AGREGAR PLAYLIST ---- ----

const buttonPlayList = document.querySelectorAll("#buttonPlayListIMG");
let srcButtonPlayList = document.querySelectorAll("#buttonPlayListIMG").src;
const divGrid = document.querySelectorAll('.divGrid');
const buttonPlayList2 = document.querySelectorAll("#buttonPlayList");



buttonPlayList.forEach((buttonPlayList, divGrid) => {
    buttonPlayList.addEventListener("click", (e) => {
        if(e.target.src.match("./AssetsA3/listareproAgregarBNSVG.svg")) {
            buttonPlayList.setAttribute("src", "./AssetsA3/listareproBusqueda.svg");
            e.target.parentElement.parentElement.classList.remove("filtroGrayScale");
            Swal.fire({
                position: 'bottom-start',
                toast: true,
                title: 'Eliminado',
                showConfirmButton: false,
                timer: 1000,
                width: '10em',
                background: '#AD1A1C',
                color:'#fff'
              })
        } else if(e.target.src ="./AssetsA3/listareproBusqueda.svg"){
            buttonPlayList.setAttribute("src", "./AssetsA3/listareproAgregarBNSVG.svg");
            e.target.parentElement.parentElement.classList.add("filtroGrayScale");
            Swal.fire({
                position: 'bottom-start',
                toast: true,
                title: 'Agregado',
                showConfirmButton: false,
                timer: 1000,
                width: '10em', 
                background: '#008000',
                color:'#fff' 
              })
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
const nav = document.querySelector('.nav');

volverAVideosBttn.forEach((volverAVideosBttn) => {
    volverAVideosBttn.addEventListener("click", () =>{
        videoVentana.classList.add("hidden");
        video.pause();
        exitFullscreen();
        nav.classList.remove("hidden");
    })
})



function playPauseVideo() {
    video[video.paused ? 'play' : 'pause'](
    )
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
    setTimeout(() => {
        videoPlay.addEventListener("click", () => {
            videoVentana.classList.remove("hidden");
            anteriorBttn.classList.remove("hidden");
            siguienteBttn.classList.remove("hidden");
            bttnAgregarListaRojo.classList.add("hidden");
            navControles1.classList.remove("hidden");
            controlesVideoLocal.classList.add('hidden');
        })
    },100)
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
    nav.classList.add("hidden");
})

// ---- ----  pantallaCompleta  ---- ----

const pantallaCompleta = document.querySelectorAll(".pantallaCompleta");
const navVideos = document.querySelector(".nav")
const seccionVideoVista = document.querySelector(".seccionVideoVista");
const videoMain = document.querySelector(".videoMain");
const seccionBusqueda = document.querySelector(".seccionBusqueda");
const seccionCarrusel = document.querySelector(".seccionCarrousel");
const seccionGrid = document.querySelector(".seccionGrid");


function getFullscreen(element){
    if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
  }

// Code Improvement Suggestions
// Suggestion 1: Use a single function to handle all vendor-prefixed fullscreen methods.
// Suggestion 2: Use feature detection instead of checking for specific browser methods.
// Suggestion 3: Add error handling for cases when fullscreen exit is not supported.
// Suggestion 4: Use arrow functions for better readability and consistency.
// Suggestion 5: Consider using a library or polyfill to handle cross-browser compatibility.

// Vendor-prefixed fullscreen methods
const exitFullscreenMethods = [
  'exitFullscreen',
  'mozCancelFullScreen',
  'webkitExitFullscreen'
];

// Feature detection for fullscreen support
function isFullscreenSupported() {
  const element = document.documentElement;
  return (
    element.requestFullscreen ||
    element.mozRequestFullScreen ||
    element.webkitRequestFullscreen ||
    element.msRequestFullscreen
  );
}

// Exit fullscreen function
const exitFullscreen = () => {
  if (isFullscreenSupported()) {
    exitFullscreenMethods.forEach(method => {
      if (document[method]) {
        document[method]();
      }
    });
  } else {
    console.error('Fullscreen is not supported.');
  }
};


 pantallaCompleta.forEach((pantallaCompleta) => {
    pantallaCompleta.addEventListener("click", () => {
        if (getFullscreen(videoMain)) {
            exitFullscreen(videoMain)
        } else {
            getFullscreen(videoMain);
        }
    })
})
