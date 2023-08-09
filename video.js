'use strict';

//data de prueba
var examplePayload=[
  {
    id: {
      kind: "youtube#video",
      playlistId: "aM4Ll47gW8Y",
      videoId: "aM4Ll47gW8Y"
    },
    snippet: {
      title: "LIONEL MESSI SCORES AFTER 80 SECONDS FOR ARGENTINA",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/aM4Ll47gW8Y/default.jpg"
        }
      }
    }
  },
  {
    id: {
      kind: "youtube#video",
      playlistId: "dVlkSgKRo28",
      videoId: "dVlkSgKRo28"
    },
    snippet: {
      title: "GOLES m�s EMOCIONANTES de Lionel Messi en la Selec",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/dVlkSgKRo28/default.jpg"
        }
      }
    }
  }
];

const numVideos = 15;
var videosView = [];
var showAllVideos = false;

var youtubeVideoList = [];
var youtubeTrendings = [];
var youtubeVieweds = [];

// ESCONDER CARRUSELES (display: none;)

$('#carousel-1, #carousel-2, #carousel-3').hide();

function loadPresentationVideos(data) {
    youtubeVideoList = data;
    loadSevenVideos();
}


function getVideosPlaylist() {
    return youtubeVideoList;
}

function cerrarVideo() {
    $(".videoScreen")[0].src = "";
    $(".videoScreen").css("display", "none");
}

function cerrar(id) {
    id = "#" + id;
    $(id).css("display", "none");
}

var showed = false;

function createCarousel() {
    $('.stopCarrousel').owlCarousel('destroy').owlCarousel({
        loop: false,
        margin: 0,
        nav: true,
        items: 5,
		navText : [
		'<img src="/static/img/video/carousel-arrow-left.png" style="height:50px;width:25px;filter:brightness(50%) sepia(100%) hue-rotate(90deg) saturate(500%);">',
		'<img src="/static/img/video/carousel-arrow-left.png" style="height:50px;width:25px;filter:brightness(50%) sepia(100%) hue-rotate(90deg) saturate(500%);transform:rotate(180deg);">' ]
    });
};

function show_video_modals(){
	$('#sliderDialog').modal('hide');
	$('#calendarioDialog').modal('hide');
	$('#modal-videos').modal('show');
	$('[data-go-area="multimedia"]').click();
    $("#croquis-area").css("margin-top", "75px");
	
    showed = true;
}
function hide_video_modals(){
	
}


$("#videos").click(function () {
    if (!showed) {
        show_video_modals();
    } else {
        $('#modal-videos').modal('hide');
		$('[data-go-area="principal"]').click();
        $("#croquis-area").css("margin-top", "34px");
        showed = false;
        return;
    }
	allVideosTrending= new Array()
$("#corousel-trending").html("");
//loadTrendingFootball();
    loadTrendingFootball();
    checkVideosViewed();

    createCarousel();

    if (videosView.length > 0) {
        loadVideosViewed();

        if (videosView.length > 9) {
            $('#templateVideosViewed').append(buttonMore("#templateVideosViewed", "button-3"));
        }
    }
	if( showed ){
		$('#myCarousel').removeClass("owl-hidden");
		$('#corousel-trending').removeClass("owl-hidden");
	}
}
);

$("#videos-locals-button").click(function () {
    $('#modal-videos-locales').modal('show');
    $('.local-videos').show();
});

function removeFromPlaylist(index, id) {
    youtubeVideoList.splice(index, 1);
    cerrar(id);
    loadSevenVideos();
    createCarousel();
}

function loadSevenVideos(all) {
    $("#myCarousel").html("");
    if (youtubeVideoList.length > 0) {
        var allVideos = "";
        $('#carousel-1').show();

        var max = (all) ? youtubeVideoList.length : 9
        for (let i = 0; i < max; i++) {
            let item = youtubeVideoList[i];

            if (!item || !item.id) {
                continue;
            }

            let propertyActive = (i == 0) ? 'active' : '';
            let videoType = item.id.kind;
            let videoId;

            if (videoType == 'youtube#video') {
                videoId = item.id.videoId;
            } else {
                videoId = item.id.playlistId;
            }

            let title = item.snippet.title.substr(0, 50);
			console.log("thumbsito",item.snippet.thumbnails);
			var auxThumb;
			if(typeof(item.snippet.thumbnails['medium']) != "undefined"){
				auxThumb=item.snippet.thumbnails['medium'];
			}else{
				auxThumb=item.snippet.thumbnails['default'];
			}
            let template = $(`
                <div id="${videoId}-playlist" class="item  ${propertyActive} thb-grow">
                <button class="btn cruz-videos" onclick="removeFromPlaylist(${i}, '${videoId}-playlist')">X</button>
                <div class="panel panel-default" style="z-index=10;">
                    <div class="panel-thumbnail">
                        <p><img data-play-video id="${'thumb-video-' + i}" width="190" height="120" title-video="${title}" data-kind="${videoType}" data-video="${videoId}" alt="Play this video" src="${auxThumb.url}"></p>
                        <h1 class="text-white">${title}</h1>
                    </div>
                </div>
            </div>`); 

         /*   let template = $(`
            <div class="video2 videoCarrusel">
            <div class="contenedorVideoControles">
                 <a class="gridCruz"><img class="cruz" src="/AssetsA3/cerrarSVG.svg"></a>  
                 <a class="gridVideoPlay"><img class="videoPlay" src="./AssetsA3/play2SVG.svg"></a>
                 <a class="gridFlechaOtra"><div class="flechaOtraA" id="flechaOtraA"><img class="flechaOtra" src="./AssetsA3/listaReproBlanco.svg"></div></a>    
             </div>  
             <a href="#">
             <p><img data-play-video id="${'thumb-video-' + i}" width="190" height="120" title-video="${title}" data-kind="${videoType}" data-video="${videoId}" alt="Play this video" src="${auxThumb.url}"></p>
             </a>
             <span>${title}</span>
         </div>`); */

            $(template.find('[data-play-video]')).on('click', function () {
                fullScreen({
                    videoId: videoId,
                    title: title,
                    kind: videoType,
                    image: item.snippet.thumbnails['default'].url
                }, 'playlist');
				
            });

            $("#myCarousel").append(template);
        }
        if (youtubeVideoList.length > 9 && !all) {
            $('#myCarousel').append(buttonMore("#myCarousel", "button-1", function () {
                showPlaylist();
            }));
        }
        checkVideosViewed();
        loadVideosViewed();
    }
}

function loadSevenTrendingVideos() {
    $("#corousel-trending").html("");
	
	
    if (allVideosTrending.length > 0) {
        for (let i = 0; i < 15; i++) {
            $("#corousel-trending").append(allVideosTrending[i]);
        }
       /* $('#corousel-trending').append(buttonMore("#corousel-trending", "button-2", function () {
            window.open('https://www.youtube.com/results?search_query=futbol&sp=CAESAhAB', '_blank')
        })); */
    }
    //checkVideosViewed();
    //createCarousel();
}

function belongsMyPlaylist(id) {
    for (let i in youtubeVideoList) {
        let item = youtubeVideoList[i];

        if (!item || !item.id) {
            return;
        }

        let videoType = item.id.kind;
        let videoId;

        if (videoType == 'youtube#video') {
            videoId = item.id.videoId;
        } else {
            videoId = item.id.playlistId;
        }

        if (videoId == id) {
            return true;
        }
    }

    return false;
}

function loadAllVideos(parentSlide, buttonId) {
    let videos = []
    if (parentSlide === "#myCarousel") {
        videos = youtubeVideoList;
    } else if (parentSlide === "#carousel-trending") {
        videos = allVideosTrending;
    } else {
        checkVideosViewed();
        loadVideosViewed(false);
        $("#button-3").hide();
        return;
    }

    $(parentSlide).html("");
    if (videos.length > 0) {
        for (let i = 0; i < videos.length; i++) {
            $(parentSlide).append(videos[i]);
        }
    }
    checkVideosViewed();
    loadVideosViewed();
}

// BOTON PARA AGREGAR MAS VIDEOS
function buttonMore(id, buttonId, onClick) {
    let mybutton = $(`<div class="item">
    <div class="button-more"><button id="${buttonId}" parent-slide="${id}" style="background:none;" class="btn video_int_icon" type="button">
    <img src="https://cdn1.iconfinder.com/data/icons/squarenav/480/plus_square_black-512.png"></button></div></div>`);

    mybutton.on('click', function () {
        if (onClick) {
            onClick();
        } else {
            loadFullVideos(this);
        }
    });

    return mybutton;
}

function loadFullVideos(event) {
    var parentSlide = event.getAttribute('parent-slide');
    $(this).hide();
    loadAllVideos(parentSlide, event.id);
}


$('#lupa').click(function () {
    let textInput = $('#buscador').val();
    $('#buscador').val('');
    callApiYoutube(textInput);
});


$("#buscador").keypress(function (e) {
    let keyEnter = 13;
    if (e.keyCode === keyEnter) {
        let textInput = $('#buscador').val();
        $('#buscador').val('');
        callApiYoutube(textInput);
    }

});

//  A LA API
function googleApiClientReady() {
    gapi.client.setApiKey("AIzaSyA8r8_fjbzHBkCdw_ZjJEyD0JpcUyu--dQ"); //AIzaSyA8r8_fjbzHBkCdw_ZjJEyD0JpcUyu--dQ");
    gapi.client.load("youtube", "v3", function () {
        // yt api is ready
    });
}

var resultsApiYoutubeData;
var videosSearchedList = [];


function addToPlaylist(data) {

    $("#carousel-1").show();
    $.toast({
        title: 'Pizarra',
        content: 'Video agregado a la lista',
        type: 'info',
        delay: 2000
    });
    youtubeVideoList.push(data);
    loadSevenVideos();
    createCarousel();
}

function callApiYoutube(query, token) {
    // prepare the request
    var request = gapi.client.youtube.search.list({
        part: "snippet",
        q: encodeURIComponent(query).replace(/%20/g, "+"),
        maxResults: 15,
        pageToken: token
    });
    // execute the request
    request.execute(function fnSearchResponse(response) {
        $('#modal-yt-result .modal-body').empty();

        let elements = $('<div class="row"></div>');
        
		$("#modal-yt-result .modal-content").css("height","calc(100vh - 84px)");
		
		$('#modal-yt-result').modal('show');
		
		
		
        resultsApiYoutubeData = response.result;

        $.each(resultsApiYoutubeData.items, function (index, item) {
            var propertyActive = '';
            var videoId = false;

            let videoType = item.id.kind;

            if (videoType == 'youtube#video') {
                videoId = item.id.videoId;
            } else {
                videoId = item.id.playlistId;
            }

            let title = item.snippet.title.substr(0, 50);

            if (index == 0) {
                propertyActive = 'active';
            }

            let offset = (index % 4 == 0) ? 'offset-1' : '';
            let offsetRight = ((index + 1) % 4 == 0) ? 'col-offset-right-1' : '';
			var auxThumb;
			if(typeof(item.snippet.thumbnails['medium']) != "undefined"){
				auxThumb=item.snippet.thumbnails['medium'];
			}else{
				auxThumb=item.snippet.thumbnails['default'];
			}
			 //<div class="col-2 ${offset} ${offsetRight} vsElement">
            var templateItem = $(`
            <div class="vsElement">
                <button style="position: absolute; top: 0; right: 0" class="btn btn-success">
					<img src="/static/img/video/lista.png" style="height:22px;width:22px;">
				</button>
                <div class="panel panel-default">
                    <div class="panel-thumbnail">
                        <p><img data-play-video data-kind="${videoType}" id="${'thumb-listplay-' + index}" width="190" height="120" title-video="${title}" data-video="${videoId}" alt="Play this video" src="${auxThumb.url}"></p>
                        <h1 class="text-white text-left">${title}
                        <br/><span class="text-muted">${item.snippet.channelTitle}</span>
                        </h1>
                    </div>
                </div>
            </div>`); 

           /* var templateItem = $(`
            <div class="video2 videoCarrusel">
            <div class="contenedorVideoControles">
                 <a class="gridCruz"><img class="cruz" src="/AssetsA3/cerrarSVG.svg"></a>  
                 <a class="gridVideoPlay"><img class="videoPlay" src="./AssetsA3/play2SVG.svg"></a>
                 <a class="gridFlechaOtra"><div class="flechaOtraA" id="flechaOtraA"><img class="flechaOtra" src="./AssetsA3/listaReproBlanco.svg"></div></a>    
             </div>  
             <a href="#">
             <p><img data-play-video data-kind="${videoType}" id="${'thumb-listplay-' + index}" width="190" height="120" title-video="${title}" data-video="${videoId}" alt="Play this video" src="${auxThumb.url}"></p>
             </a>
             <span>${title}</span>
         </div>`); */

            $(templateItem.find('[data-play-video]')).on('click', function () {
                fullScreen({
                    videoId: videoId,
                    title: title,
                    kind: videoType,
                    image: item.snippet.thumbnails['default'].url
                }, 'results');
            });

            if (belongsMyPlaylist(videoId)) {
                templateItem.find('button').prop('disabled', true);
            }

            $(templateItem.find('button')).on('click', function () {
                addToPlaylist(item);
                templateItem.find('button').prop('disabled', true);
            })

            elements.append(templateItem);
        });

        $('#modal-yt-result .modal-body').append(elements);

        let pagination = $(`
                <div class="col-12 text-center" style="margin-top: 20px;">
                    <button data-yt-prev-page class="btn btn-default vsPaginationBtn" style="display: none">&larr; Anterior</button> 
                    <button data-yt-next-page class="btn btn-default vsPaginationBtn" style="display: none">Siguiente &rarr;</button>
                </div>
            `)

        //$('#modal-yt-result .modal-body').append(pagination)
        elements.append(pagination)

        let nextToken = resultsApiYoutubeData.nextPageToken;
        if (nextToken) {
            $('[data-yt-next-page]').show().on('click', function () {
                let request = gapi.client.youtube.search.list({
                    part: "snippet",
                    q: encodeURIComponent(query).replace(/%20/g, "+"),
                    maxResults: 15,
                    pageToken: nextToken
                });

                request.execute(fnSearchResponse);
            });
        }

        let prevToken = resultsApiYoutubeData.prevPageToken;
        if (prevToken) {
            $('[data-yt-prev-page]').show().on('click', function () {
                let request = gapi.client.youtube.search.list({
                    part: "snippet",
                    q: encodeURIComponent(query).replace(/%20/g, "+"),
                    maxResults: 15,
                    pageToken: prevToken
                });
                request.execute(fnSearchResponse);
            })
        }

        let btnBack = $(`
            <button type="button" class="btn btn-rounded volverVideosButton" data-close aria-label="Close" style="position: absolute;right: 5em;">
                Volver a videos
            </button>
        `);
        btnBack.on('click', function () {
            $('#modal-yt-result').modal('hide');
        });
        pagination.append(btnBack);

    });
}

function fullScreen(data, section) {
    var videoId = data['videoId'];
    var title = data['title'];
    var kind = data['kind'];
    var image = data['image'];

    showPleaseWait('Cargando video...');

    window.videoMode = true;

    if (!videoId) return;

    $('.yt-controls').css("display", "flex");

    // Guardar historial de videos vistos
    let videoViewed = {
        'videoId': videoId,
        'title': title,
        'kind': kind,
        'image': image
    };
	
	FreeHandHandler.exitDraw().then( function(){ enterDraw();} );

    currentYTVideo = {
        section: section,
        videoId: videoId,
        item: {
            id: {
                kind: kind,
                playlistId: videoId,
                videoId: videoId
            },
            snippet: {
                title: title,
                thumbnails: {
                    default: {
                        url: image
                    }
                }
            }
        }
    };

    if (section != 'viewed') {
        let founded = false;

        for (let i in youtubeVieweds) {
            if (youtubeVieweds[i].videoId == videoViewed.videoId) {
                founded = true;
                break;
            }
        }

        if (!founded) {
            youtubeVieweds.push(videoViewed);
            sessionStorage.setItem('viewed', JSON.stringify(youtubeVieweds));
        }
        checkVideosViewed();
        loadVideosViewed();

        if (youtubeVieweds.length > 9) {
            $('#corousel-lastviewed').append(buttonMore("#corousel-lastviewed", "button-3"));
        }

        createCarousel();
    }

    if (kind == 'youtube#video') {
        window.player.loadVideoById({
            'videoId': videoId,
            'events': {
                onReady: onPlayerReady
            }
        });
    } else {
        window.player.loadPlaylist({
            list: videoId,
            listType: 'playlist',
            index: 0
        })
    }

    $('#modal-fullScreen').modal('show');
}

function onPlayerReady(event) {

    console.log("localhost play");
    window.player.setVolume(volumeRange.value);
    event.target.playVideo();
    $('.local-videos .btn-play').hide();
    $('.local-videos .btn-pause').show();
	
}


// Tendencias futbol
var trendingResult;
var allVideosTrending = [];
var currentYTVideo = {
};


function _getYTVideoId(item) {
    let videoId;

    if (item.id.kind == 'youtube#video') {
        videoId = item.id.videoId;
    } else {
        videoId = item.id.playlistId;
    }
    return videoId;
}

function _getYTVideoPos(videoId, list) {
    for (let i = 0; i < list.length; i++) {
        if (_getYTVideoId(list[i]) == videoId) {
            return i;
        }
    }
    return false;
}

function seekYoutubeVideo(direction) {
    if (currentYTVideo['section'] == 'results') {
        return;
    }

    let section = currentYTVideo['section'];
    let videos;
    if (section == 'playlist') {
        videos = youtubeVideoList;
    } else if (section == 'viewed') {
        videos = youtubeVieweds;
    } else if (section == 'trending') {
        videos = youtubeTrendings;
    }

    if (videos) {
        let pos = _getYTVideoPos(currentYTVideo['videoId'], videos);
        if (pos == (videos.length - 1) && direction == 1 ||
            (pos == 0 && direction == -1)) {
            return;
        }

        let item = videos[pos + direction];
        let nVideoId = _getYTVideoId(item);
		
		var auxThumb;
		if(typeof(item.snippet.thumbnails['medium']) != "undefined"){
			auxThumb=item.snippet.thumbnails['medium'];
		}else{
			auxThumb=item.snippet.thumbnails['default'];
		}

        fullScreen({
            videoId: nVideoId,
            title: item.snippet.title,
            kind: item.id.kind,
            image: auxThumb.url
        }, section);
    }
}

function getYTTime(totalSec) {
    var hours = parseInt(totalSec / 3600) % 24;
    var minutes = parseInt(totalSec / 60) % 60;
    var seconds = parseInt(totalSec % 60);
    var result = (hours < 1 ? "" : hours + ":") + (minutes < 1 ? "0" : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    return result;
}

function showPlaylist() {
    let ul = $("<ul></ul>");

    let sortable = ul.sortable({
        handle: '.draggabble'
    });

    sortable.on("sortstop", function ($placeholder, container, $closestItemOrContainer) {
        let elements = $('ul > li > div');
        let order = [];
        let newOrder = [];
        console.log('stop');
        for (let el of elements) {
            let sortedVideoId = el.getAttribute("data-video-id");

            for (let j in youtubeVideoList) {
                let item = youtubeVideoList[j];
                let videoId;

                if (!item || !item.id) {
                    continue;
                }

                if (item.id.kind == 'youtube#video') {
                    videoId = item.id.videoId;
                } else {
                    videoId = item.id.playlistId;
                }

                if (videoId == sortedVideoId) {
                    newOrder.push(item);
                    break;
                }
            }
        }

        youtubeVideoList = newOrder;
        loadSevenVideos();

    }
    );

    let content = $('#dlgPlaylist .modal-body').empty();
    for (let i = 0; i < youtubeVideoList.length; i++) {
        let item = youtubeVideoList[i];

        if (!item || !item.id) {
            continue;
        }

        let propertyActive = (i == 0) ? 'active' : '';
        let videoType = item.id.kind;
        let videoId;

        if (videoType == 'youtube#video') {
            videoId = item.id.videoId;
        } else {
            videoId = item.id.playlistId;
        }

        let title = item.snippet.title.substr(0, 50);
		
		var auxThumb;
		if(typeof(item.snippet.thumbnails['medium']) != "undefined"){
			auxThumb=item.snippet.thumbnails['medium'];
		}else{
			auxThumb=item.snippet.thumbnails['default'];
		}
		
        let template = $(`
            <div id="${videoId}-playlist" data-video-id="${videoId}" class="playlist-item  ${propertyActive} ">
            <div class="panel panel-default">
                <div class="panel-thumbnail">
                    <div class="draggabble" style="width: 32px">
                        <img src="/static/img/drag.png" style="width: 100%"/>
                    </div>
                    <p><img data-play-video id="${'thumb-video-' + i}" width="190" height="120" title-video="${title}" data-kind="${videoType}" data-video="${videoId}" alt="Play this video" src="${auxThumb.url}"></p>
                    <div class="list-description">
                        <h1 class="text-white">${title}</h1>
                        <span>
                            <Button 
                                class="btn btn-success"
                                data-play-video width="190" height="120" title-video="${title}" data-kind="${videoType}" data-video="${videoId}" alt="Play this video" src="${auxThumb.url}"
                                >Reproducir</button> 
                            <Button class="btn btn-danger"
                                onclick="removeFromPlaylist(${i}, '${videoId}-playlist');
                                        showPlaylist();">Quitar</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>`);
        $(template.find('[data-play-video]')).on('click', function () {
            fullScreen({
                videoId: videoId,
                title: title,
                kind: videoType,
                image: auxThumb.url
            }, 'playlist');
        });
        let el = $('<li></li>');
        el.append(template);
        ul.append(el);
    }

    content.append(ul);
    $('#dlgPlaylist').modal('show');
}

// DESTACADOS TEMPLATE
function loadTrendingFootball() {
    $("#carousel-2").show();
    // Videos publicados las �ltimas 24 horas
    let currentDate = new Date();
    let yesterday = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

    // prepare the request
    var request = gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        q: "futbol argentina",
        order: "rating",
        publishedAfter: yesterday.toISOString(),
        maxResults: numVideos
    });

    // execute the request
    request.execute(function (response) {
        trendingResult = response.result;
        $("#templateTrending").html("");
        $.each(trendingResult.items, function (index, item) {
            var propertyActive = '';
            let videoId = false;
            let title = item.snippet.title.substr(0, 50);

            if (index == 0) {
                propertyActive = 'active';
            }

            let videoType = item.id.kind;

            if (videoType == 'youtube#video') {
                videoId = item.id.videoId;
            } else {
                videoId = item.id.playlistId;
            }
			
			var auxThumb;
			if(typeof(item.snippet.thumbnails['medium']) != "undefined"){
				auxThumb=item.snippet.thumbnails['medium'];
			}else{
				auxThumb=item.snippet.thumbnails['default'];
			}

            let videoItem = {
                videoId: videoId,
                kind: videoType,
                title: title,
                image: auxThumb.url
            };

            youtubeTrendings.push(videoItem);

           /* var templateTrending = $(`
            <div id="${videoId}-trend" class="item  ${propertyActive} thb-grow">
            <div class="panel panel-default">
                    <div class="panel-thumbnail">
                        <p><img data-play-video id="${'thumb-trending-' + index}" width="190" height="120" title-video="${title}" data-kind="${videoType}" data-video="${videoId}" alt="Play this video" src="${auxThumb.url}"></p>
                        <h1 class="text-white">${title}</h1>
                    </div>
                </div>
                </div>`); */

                var templateTrending = $(`
                <div class="video2 videoCarrusel">
                <div class="contenedorVideoControles">
                     <a class="gridCruz"><img class="cruz" src="/AssetsA3/cerrarSVG.svg"></a>  
                     <a class="gridVideoPlay"><img class="videoPlay" src="./AssetsA3/play2SVG.svg"></a>
                     <a class="gridFlechaOtra"><div class="flechaOtraA" id="flechaOtraA"><img class="flechaOtra" src="./AssetsA3/listaReproBlanco.svg"></div></a>    
                 </div>     
                 <a>
                 <img class="imgVideo" id="${'thumb-trending-' + index}" title-video="${title}" data-kind="${videoType}" data-video="${videoId}" alt="Play this video" src="${auxThumb.url}">
                 </a>
                 
                 
                 <span>${title}</span>
             </div>`);

                

            $(templateTrending.find('[data-play-video]')).on('click', function () {
                fullScreen(videoItem, 'trending');
            });
            allVideosTrending.push(templateTrending);

        });
        loadSevenTrendingVideos();
    });
}

function checkVideosViewed() {

    let videos = sessionStorage.getItem('viewed');
    if (videos) {
        youtubeVieweds = JSON.parse(videos);
    } else {
        youtubeVieweds = [];
    }
}

function loadVideosViewed(cargarSeis = true) {
    if (youtubeVieweds.length > 0) {
        $("#carousel-3").show();
    }

    $("#corousel-lastviewed").html("");
    $.each(youtubeVieweds, function (index, item) {
        let videoData = item;

        let propertyActive = '';

        if (index == 0) {
            propertyActive = 'active';
        }

        let videoId = videoData.videoId;
        let title = videoData.title;
        let image = videoData.image;
        let kind = videoData.kind;

        let templateVideosViewed = $(`
        <div id="${videoId}-viewed" class="item  ${propertyActive} thb-grow">
            <div class="panel panel-default">
                <div class="panel-thumbnail">
                    <p><img data-play-video data-kind="${videoData.kind}" id="${'thumb-templateVideosViewed-' + index}" width="190" height="120" title-video="${title}" is-viewed="true" data-video="${videoData.videoId}" alt="Play this video" src="${videoData.image}"></p>
                    <h1 class="text-white">${title}</h1>
                </div>
            </div>
            </div>`);
        $(templateVideosViewed.find('[data-play-video]')).on('click', function () {
            fullScreen({
                videoId: videoId,
                title: title,
                kind: kind,
                image: image
            }, 'viewed');
        });
        if (cargarSeis) {
            if (index < 9) {
                $('#corousel-lastviewed').append(templateVideosViewed);
            }
        } else {
            $('#corousel-lastviewed').append(templateVideosViewed);
        }

    });
}


function emptyVideos() {
    var videoElement = document.getElementById('local-video');
    videoElement.pause();
    videoElement.removeAttribute('src'); // empty source
    videoElement.load();
    videos = [];
    currentVideo = 0;
    $('[data-local-video-index]').text(``);
}

var progressBar = document.getElementById('progress-bar');
var videoLocal;
if(progressBar!=null){
progressBar.addEventListener("click", seek);
}

function seek(e) {
    var percent = e.offsetX / this.offsetWidth;
    videoLocal.currentTime = percent * videoLocal.duration;
    /*e.target.value = Math.floor(percent / 100);
    e.target.innerHTML = progressBar.value + '% played';*/
}

function initPlayList() {
    var videoItem = document.getElementById('local-video');
    videoLocal = videoItem;

    // Reproducir primer video
    videoNode.src = videos[0];

    $('.local-videos .btn-play').hide();
    $('.local-videos .btn-pause').show();
    videoLocal.addEventListener('timeupdate', updateProgressBar, false);
	FreeHandHandler.exitDraw().then( function(){ enterDraw();} );

    // Evento para reproducir el siguiente video de la lista
    videoItem.addEventListener('ended', function (e) {
        let link, nextVideo, nextLink;
        for (let i in videos) {
            link = videos[i];
            nextVideo = parseInt(i) + 1;
            if (i == (videos.length - 1)) return;
            if (link === this.src) {
                nextLink = videos[nextVideo];
                run(nextLink, videoItem);
				currentVideo++;
				if (currentVideo >= videos.length)currentVideo = 0;
                break;
            }
        }
    });
}



function updateProgressBar() {
    // Work out how much of the media has played via the duration and currentTime parameters
    var percentage = Math.floor((100 / videoLocal.duration) * videoLocal.currentTime);
    // Update the progress bar's value
    progressBar.value = percentage;
	console.log("entra progressbar",percentage+"%");
	$("#local-thumb").css("left",percentage+"%");
    // Update the progress bar's text (for browsers that don't support the progress element)
    /*progressBar.innerHTML = percentage + '% played';*/
}

function run(src, video) {
    video.src = src;
    video.load();
    video.play();
	FreeHandHandler.exitDraw().then( function(){ enterDraw();} );
}

var fileInput = document.querySelector('#inputFiles');

var videos = [];

var currentVideo = 0;

var videoNode = document.querySelector('#local-video');

if(videoNode!=null){
videoNode.addEventListener("error", () => {
    $.toast({
        title: 'Pizarra',
        content: 'No se puede reproducir el video actual.',
        type: 'error',
        delay: 2000
    });
    nextVideo();
});
}

function handleSelected(e) {
    $('#dlgLoadingLocalVideos').modal('show')
    let total = fileInput.files.length;
    for (var a = 0; a < fileInput.files.length; a++) {
        var selectedFile = fileInput.files[a];
        if (selectedFile) {
            var type = selectedFile.type

            var canPlay = videoNode.canPlayType(type)
            if (canPlay === '') canPlay = 'no'
            var isError = canPlay === 'no'
            if (isError) {
                continue;
            }
            var fileURL = URL.createObjectURL(selectedFile)
            videos.push(fileURL);
            $('#dlgLoadingLocalVideos .progress-bar').css('width', ((a * 100) / total) + 'px');
            $('#dlgLoadingLocalVideos .progress-bar').text(`${a + 1}/${total}`)
        }
    }
    initPlayList();

    $('#dlgLoadingLocalVideos').modal('hide')
}

if(fileInput!=null){
fileInput.addEventListener('change', handleSelected);
}

// if (window.parent && window.parent.parent) {
    // window.parent.parent.postMessage(["resultsFrame", {
        // height: document.body.getBoundingClientRect().height,
        // slug: "cCCZ2"
    // }], "*")
// }

function nextVideo() {
    if (videos.length === 0) return;
    currentVideo++;
    if (currentVideo >= videos.length) {
        currentVideo = 0;
    }
    videoNode.src = videos[currentVideo];
	FreeHandHandler.exitDraw().then( function(){ enterDraw();} );
    $('.local-videos .btn-play').hide();
    $('.local-videos .btn-pause').show();
}

function PrevVideo() {
    if (videos.length === 0) return;
    currentVideo--;
    if (currentVideo < 0) {
        currentVideo = videos.length - 1;
    }
    videoNode.src = videos[currentVideo];
	FreeHandHandler.exitDraw().then( function(){ enterDraw();} );
    $('.local-videos .btn-play').hide();
    $('.local-videos .btn-pause').show();
}

function pauseVideo() {
    $('.local-videos .btn-play').show();
    $('.local-videos .btn-pause').hide();
    videoNode.pause();
}

function playVideo() {
    $('.local-videos .btn-play').hide();
    $('.local-videos .btn-pause').show();
    videoNode.play();
}

if(videoNode!=null){
videoNode.onplay = function () {
    if (videos.length > 0) {
        $('[data-local-video-index]').text(`${currentVideo + 1} de ${videos.length}`);
    } else {
        $('[data-local-video-index]').text(``);
    }
}
}

let volumeRange = document.querySelector('.volslide input');
let volumeRangeLocal = document.querySelector('.volslideLocal input');
let speedRange = document.querySelector('.speedslide input');
let speedRangeLocal = document.querySelector('.speedslideLocal input');


// use 'change' instead to see the difference in response
if(volumeRange!=null){
volumeRange.addEventListener('input', function () {
    console.log(volumeRange.value);
    window.player.setVolume(volumeRange.value);
}, false);
}

if(volumeRangeLocal!=null){
volumeRangeLocal.addEventListener('input', function () {

    console.log(volumeRangeLocal.value, volumeRangeLocal.value / 100);
    videoNode.volume = volumeRangeLocal.value / 100;
    if( volumeRangeLocal.value < 1 ){ $("#local_mute_img").show(); }
    else{ $("#local_mute_img").hide(); };
}, false);
}


if(speedRange!=null){
speedRange.addEventListener('input', function () {
    console.log(parseFloat(speedRange.value));
    window.player.setPlaybackRate(parseFloat(speedRange.value));
}, false);
}

if(speedRangeLocal!=null){
speedRangeLocal.addEventListener('input', function () {
    console.log(parseFloat(speedRangeLocal.value));
    videoNode.playbackRate = parseFloat(speedRangeLocal.value);
}, false);
}

$('.volslide,.speedslide,.volslideLocal,.speedslideLocal').on("click", function () {
    var sliderCont = $(this).find(".control-range-wrap");
    if ($(sliderCont).hasClass("slider-open")) {
        $(this).find(".control-range-wrap").removeClass("slider-open");
    } else {
        $(this).find(".control-range-wrap").addClass("slider-open");
    }


});