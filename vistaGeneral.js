 const fila = document.querySelector('.contenedorCarruselListaRepro');
 const fila2 = document.querySelector('.contenedorCarruselDestacados');
 const videos1 = document.querySelectorAll('.videoCarruselListaRepro');
 const videos2 = document.querySelectorAll('.video2');
 const videos = document.querySelectorAll('.videoCarrusel');

 const flechaIzquierda = document.getElementById('flecha-izquierda');
 const flechaDerecha = document.getElementById('flecha-derecha');

 const flechaIzquierda2 = document.getElementById('flecha-izquierda2');
 const flechaDerecha2 = document.getElementById('flecha-derecha2'); 
 
 // ---- ---- Event Listener para flecha derecha ---- ----

 flechaDerecha.addEventListener('click',() =>{
    fila.scrollLeft += fila.offsetWidth;
    console.log(fila.scrollLeft);
    flechaIzquierda.classList.remove("opacity0");
    if (fila.scrollLeft >= 2904) {
        flechaDerecha.classList.add("opacity0")
    } else {
        flechaDerecha.classList.remove("opacity0")
    }
 });

 flechaDerecha2.addEventListener('click',() =>{
    fila2.scrollLeft += fila2.offsetWidth;
    
    flechaIzquierda2.classList.remove("opacity0");
    if (fila2.scrollLeft >= 2904) {
        flechaDerecha2.classList.add("opacity0")
    } else {
        flechaDerecha2.classList.remove("opacity0")
    }
 });


 // ---- ---- Event Listener para flecha Izquierda ---- ----


 flechaIzquierda.addEventListener('click',() =>{
    fila.scrollLeft -= fila.offsetWidth;
    console.log(fila.scrollLeft);
    flechaDerecha.classList.remove("opacity0")
    if (fila.scrollLeft <= 1500) {
        flechaIzquierda.classList.add("opacity0");
    } else { 
        flechaIzquierda.classList.remove("opacity0");
    }
 })

 flechaIzquierda2.addEventListener('click',() =>{
    fila2.scrollLeft -= fila2.offsetWidth;
    flechaDerecha2.classList.remove("opacity0")
    if (fila2.scrollLeft <= 1500) {
        flechaIzquierda2.classList.add("opacity0");
    } else {
        flechaIzquierda2.classList.remove("opacity0");
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


searchInput.addEventListener('keydown', () => {
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
// ---- ---- CAMBIO DE COLOR AGREGAR PLAYLIST CARRUSEL ---- ----
const bttnAgregarPlaylistCarrusel = document.querySelectorAll("#flechaOtraA")

bttnAgregarPlaylistCarrusel.forEach((bttnAgregarPlaylistCarrusel) => {
    bttnAgregarPlaylistCarrusel.addEventListener("click", (e) => {
        if (e.target.parentElement.parentElement.parentElement.parentElement.classList.contains("filtroGrayScale")) {
            e.target.parentElement.parentElement.parentElement.parentElement.classList.remove("filtroGrayScale")
        } else {
            e.target.parentElement.parentElement.parentElement.parentElement.classList.add("filtroGrayScale")
        }
    })
})


// ---- ---- CAMBIO DE COLOR AGREGAR PLAYLIST ---- ----

const buttonPlayList = document.querySelectorAll("#buttonPlayListIMG");
let srcButtonPlayList = document.querySelectorAll("#buttonPlayListIMG").src;
const divGrid = document.querySelectorAll('.divGrid');
const buttonPlayList2 = document.querySelectorAll("#buttonPlayList");



buttonPlayList.forEach((buttonPlayList) => {
    buttonPlayList.addEventListener("click", (e) => {
        if(e.target.parentElement.parentElement.classList.contains("filtroGrayScale")) {
            e.target.parentElement.parentElement.classList.remove("filtroGrayScale");
        } else {
            e.target.parentElement.parentElement.classList.add("filtroGrayScale");
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
        navControles1.classList.remove("hidden");
        controlesVideoLocal.classList.add("hidden");
        bttnTachoBlanco.classList.remove("bottom0");
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
const playButton = document.querySelectorAll('.playVideo');
const imgPlayButton = document.querySelectorAll('.imgPlayButton');
const progressBar = document.querySelectorAll('.progressVideo');
const timestamp = document.querySelector(".timestamp")
const volverAVideosBttn = document.querySelectorAll(".volverAVideosVista");
const videoVentana = document.querySelector(".videoVentana")
const nav = document.querySelector('.nav');

volverAVideosBttn.forEach((volverAVideosBttn) => {
    volverAVideosBttn.addEventListener("click", () =>{
        videoVentana.classList.add("hidden");
        video.pause();
        nav.classList.remove("hidden");
        document.exitFullscreen()
        navControles1.removeEventListener("mouseover", fullScreen);
        controlesVideoLocal.removeEventListener("mouseover", fullScreen);
        video.removeEventListener("mouseover", videoFullScreen);
        pantallaCompleta.classList.remove("pantallaCompletaActivo");
    })
})

// ---- ---- PLAY PAUSE ---- ----

function playPauseVideo() {
    if (video.paused){
        video.play();
        imgPlayButton.forEach((imgPlayButton) => {
            imgPlayButton.setAttribute("src", "./AssetsA3/VideosIcons/pauseNegro.svg");
        })
    } else {
        video.pause();
        imgPlayButton.forEach((imgPlayButton) => {
            imgPlayButton.setAttribute("src", "./AssetsA3/VideosIcons/playNegro.svg");
        })
    }
}

video.addEventListener("click", () => {
    playPauseVideo()
})

playButton.forEach((playButton) => {
    playButton.addEventListener("click", playPauseVideo)
})

// ---- ---- BARRA DE CARGA ---- ----

// function updateVideoProgress() {
//    
//        progressBar.value = Number((video.currentTime / video.duration) * 100)
//  
//    let minutes = Math.floor(video.currentTime / 60)    
//    let seconds = Math.floor(video.currentTime % 60)
//    if (minutes < 10) {
//        minutes = "0" + minutes
//    }
//    if (seconds < 10) {
//        seconds = "0" + seconds
//    }
//   timestamp.textContent = `${minutes}:${seconds}`
// }

// function setVideoProgress () {
//    
//        video.currentTime = Number((progressBar.value * video.duration) / 100)
//
// }



// progressBar.forEach((progressBar) =>{
    //    progressBar.addEventListener("change", setVideoProgress)
    // });
    
    
    //    video.addEventListener("timeupdate", updateVideoProgress)
    

const currentTimeElem = document.querySelectorAll(".current-time")
const totalTimeElem = document.querySelectorAll(".total-time")
const previewImg = document.querySelectorAll(".preview-img")
const thumbnailImg = document.querySelector(".thumbnail-img")
const timelineContainer = document.querySelectorAll(".timeline-container")
    
// timeline
timelineContainer.forEach((timelineContainer) => {
    timelineContainer.addEventListener("mousemove", handleTimelineUpdate)
    timelineContainer.addEventListener("mousedown", toggleScrubbing)

    function toggleScrubbing(e) {
        const rect = timelineContainer.getBoundingClientRect()
        const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
        isScrubbing = (e.buttons & 1) === 1
        videoVentana.classList.toggle("scrubbing", isScrubbing)
        if (isScrubbing) {
          wasPaused = video.paused
          video.pause()
        } else {
          video.currentTime = percent * video.duration
          if (!wasPaused) video.play()
        }
      
        handleTimelineUpdate(e)
      }
      
      function handleTimelineUpdate(e) {
        const rect = timelineContainer.getBoundingClientRect()
        const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
        const previewImgSrc = `AssetsA3/imgPrev/preview10.jpg`
        previewImg.forEach((previewImg) => {
            previewImg.src = previewImgSrc
        })
        timelineContainer.style.setProperty("--preview-position", percent)
      
        if (isScrubbing) {
          e.preventDefault()
          timelineContainer.style.setProperty("--progress-position", percent)
        }
      }
      
      document.addEventListener("mouseup", e => {
        if (isScrubbing) toggleScrubbing(e)
      })
      document.addEventListener("mousemove", e => {
        if (isScrubbing) handleTimelineUpdate(e)
      })
      
      let isScrubbing = false
      let wasPaused

})      





// TIME CLOCK

 video.addEventListener("loadeddata", () => {
    totalTimeElem.forEach((totalTimeElem) => {
        totalTimeElem.textContent = formatDuration(video.duration)
    })
  })
  
  video.addEventListener("timeupdate", () => {
    currentTimeElem.forEach((currentTimeElem) => {
        currentTimeElem.textContent = formatDuration(video.currentTime)
    })
    const percent = video.currentTime / video.duration
    timelineContainer.forEach((timelineContainer) => {
        timelineContainer.style.setProperty("--progress-position", percent)
    })
  })
  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  })

  function formatDuration(time) {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)
    if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`
    } else {
      return `${hours}:${leadingZeroFormatter.format(
        minutes
      )}:${leadingZeroFormatter.format(seconds)}`
    }
  }
  
  function skip(duration) {
    video.currentTime += duration
  }


// ---- ---- BOTONES PLAY / FLECHA LISTA REPRO---- ----

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
            bttnTachoBlanco.classList.remove("bottom0");
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
        bttnTachoBlanco.classList.remove("bottom0");
    })
})

const bttnAgregarListaRojoSpan = document.querySelector("#bttnAgregarListaRojoSpan");


bttnAgregarListaRojo.addEventListener("click", () =>{
    bttnAgregarListaRojoSpanToggle()
})

function bttnAgregarListaRojoSpanToggle() {
   if (bttnAgregarListaRojoSpan.innerHTML == "Agregar a la lista") {
    bttnAgregarListaRojoSpan.innerHTML = "Video agregado"
    bttnAgregarListaRojo.classList.add("bttnAgregarListaRojoBackground")
    
   } else {
    bttnAgregarListaRojoSpan.innerHTML = "Agregar a la lista"
    bttnAgregarListaRojo.classList.remove("bttnAgregarListaRojoBackground")
    
   }
}

// --- ---- Bttn Volumen ---- ----

const volumenBttn = document.querySelectorAll(".volumenImg");


/* volumenBttn.forEach((volumenBttn) => {
    volumenBttn.addEventListener("click", (e) => { 
        if (video.volume == 1) {
            video.volume = 0;
            volumenBttn.setAttribute("src", "./AssetsA3/VideosIcons/volumenMute.svg")
        } else {
            video.volume = 1;
            volumenBttn.setAttribute("src", "./AssetsA3/VideosIcons/volumen.svg")
        }
    })
}) */

// --- ---- Volumen SLIDE ---- ----
const volumenSlide = document.querySelectorAll(".volumenSlide");

/* volumenBttn.forEach((volumenBttn) => {
    volumenBttn.addEventListener("click", toggleMute)
})

function toggleMute() {
    if (video.volume == 1) {
        video.volume = 0;
        volumenBttn.forEach((volumenBttn) => {
            volumenBttn.setAttribute("src", "./AssetsA3/VideosIcons/volumenMute.svg")
        })
    } else {
        video.volume = 1;
        volumenBttn.forEach((volumenBttn) => {
            volumenBttn.setAttribute("src", "./AssetsA3/VideosIcons/volumen.svg")
        })
    }
  }

volumenSlide.forEach((volumenSlide) => {
    volumenSlide.addEventListener("input", e => {
        video.volume = e.target.value
        video.muted = e.target.value === 0
    })
})

    video.addEventListener("volumechange", (volumenSlide) => {
        volumenSlide.value == video.volume
        if (video.muted || video.volume === 0) {
            volumenSlide.value = 0
        }
    })

*/
const videoVista = document.querySelector("videoVista");

volumenBttn.forEach((volumenBttn) => {
    volumenBttn.addEventListener("click", toggleMute)
})
volumenSlide.forEach((volumenSlide) => {
    volumenSlide.addEventListener("input", e => {
      video.volume = e.target.value
      video.muted = e.target.value === 0
    })
})

function toggleMute() {
  video.muted = !video.muted
}

video.addEventListener("volumechange", () => {
  volumenSlide.value = video.volume
  let volumeLevel
  if (video.muted || video.volume === 0) {
    volumenSlide.value = 0
    volumenBttn.forEach((volumenBttn) => {
        volumenBttn.setAttribute("src", "./AssetsA3/VideosIcons/volumenMute.svg")
    })
  } else {
        volumenBttn.forEach((volumenBttn) => {
            volumenBttn.setAttribute("src", "./AssetsA3/VideosIcons/volumen.svg")
        })
  }

  video.dataset.volumeLevel = volumeLevel
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

function fullScreen() {      
                navControles1.classList.remove("opacity0")       
                controlesVideoLocal.classList.remove("opacity0")
                bttnTachoBlanco.classList.remove("opacity0")
                
        }

function videoFullScreen() {
    navControles1.classList.add("opacity0")
            controlesVideoLocal.classList.add("opacity0")
            bttnTachoBlanco.classList.add("opacity0")
            
}

function pantallaCompletaToggle() {
    if (document.fullscreenElement == null) {
        seccionVideoVista.requestFullscreen()
        video.addEventListener("mouseover", videoFullScreen)
        navControles1.addEventListener("mouseover", fullScreen)
        controlesVideoLocal.addEventListener("mouseover", fullScreen)
        
    } else {
        navControles1.removeEventListener("mouseover", fullScreen);
        controlesVideoLocal.removeEventListener("mouseover", fullScreen)
        video.removeEventListener("mouseover", videoFullScreen)
        
        document.exitFullscreen()
    }
}
  
    pantallaCompleta.forEach((pantallaCompleta) => {
        pantallaCompleta.addEventListener("click", () => {
            pantallaCompletaToggle()
            pantallaCompleta.classList.toggle("pantallaCompletaActivo");
        });
    })
