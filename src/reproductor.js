const playlist = document.getElementById("playlist");
const favoritos = document.getElementById("favoritos");
const busqueda = document.getElementById("busqueda");

//Clase canciones
class Song {
    constructor(id, nombre, duracion, album, anio, genero, artista, portada, url, isInPlaylist = false, isFavorite = false) {
        this.id = id;
        this.nombre = nombre;
        this.duracion = duracion;
        this.album = album;
        this.anio = anio;
        this.genero = genero;
        this.artista = artista;
        this.portada = portada;
        this.url = url;
        this.isInPlaylist = isInPlaylist;
        this.isFavorite = isFavorite;
    }

    getSongNameAndArtistAndGender() {
        return `${this.nombre} - ${this.artista} - ${this.genero}`;
    }
}

//Clase playlist
class PlayList {
    constructor({ nombre, canciones = [], container, mainPlaylist, currentSongIndex }) {
        this.nombre = nombre;
        this.canciones = canciones;
        this.container = container;
        this.mainPlaylist = mainPlaylist;
        this.currentSongIndex = currentSongIndex
    }

    addSong = function (cancion) {
        this.canciones.push(cancion);
        return this.canciones;
    }

    removeSong = function (cancion) {
        const index = this.canciones.findIndex(song => song.id === cancion.id);
        if (index !== -1) {
            this.canciones.splice(index, 1);
            if (index === indiceActual) {
                var audioActual = document.querySelector('audio');
                audioActual.pause();
            }
            // Si la canción eliminada está antes de la actual, ajustar el índice de reproducción
            else if (indice < indiceActual) {
                indiceActual--;
            }
        }
    }
}

//Clase reproductor
class Reproductor {
    audio;
    currentSong;
    catalogoCanciones;
    currentPlaylist;
    busqueda;
    favorites;
    mainPlaylist;
    currentPlaybackTime;
    currentIndex;
    constructor() {
        this.catalogoCanciones = [
            new Song(1, "Die for you", "3:52", "After Hours", "2023", "R&B", "The Weeknd & Ariana Grande", "1.jpg", "1.mp3"),
            new Song(2, "Calm down", "3:59", "Rave & Roses", "2023", "Afropop", "Rema ft Selena Gomez", "2.jpeg", "2.mp3"),
            new Song(3, "Wolves", "3:18", "Single", "2017", "EDM", "Selena Gomez X Marshmello", "3.jpg", "3.mp3"),
            new Song(4, "Sorry", "3:20", "Purpose", "2015", "Pop", "Justin Bieber", "4.jpg", "4.mp3"),
            new Song(5, "Igual que un angel", "4:20", "Orquideas", "2024", "Urbano latino", "Kali Uchis ft Peso pluma", "5.png", "5.mp3"),
            new Song(6, "Faded", "3:32", "Single", "2015", "Electronica", "Alan Walker", "6.jpg", "6.mp3"),
            new Song(7, "Flowers", "3:20", "Endless Summer Vacation", "2023", "Pop", "Miley Cyrus", "7.jpg", "7.mp3"),
            new Song(8, "Monaco", "4:26", "NSLQPM", "2023", "Urbano latino", "Bad Bunny", "8.jpg", "8.mp3"),
            new Song(9, "Perro negro", "2:42", "NSLQPM", "2023", "Urbano latino", "Bad Bunny", "9.jpg", "9.mp3"),
            new Song(10, "Beso", "3:17", "Fruta seca", "2023", "Electronica", "Carlos Vives", "10.jpg", "10.mp3"),
            new Song(11, "Ascend", "3:20", "Single", "2023", "Electronica", "Dezko", "11.jpg", "11.mp3"),
            new Song(12, "Telepatia", "2:40", "Sin miedo", "2020", "Urbano latino", "Kali Uchis", "12.jpg", "12.mp3"),
            new Song(13, "One of the girls", "4:03", "Cry in silence", "2023", "Pop", "Jennie, The Weeknd", "13.jpg", "13.mp3"),
            new Song(14, "Odio", "3:45", "Formula", "2014", "Bachata", "Romero Santos, Drake", "14.jpg", "14.mp3"),
            new Song(15, "Earned it", "4:35", "50 sombras", "2015", "R&B", "The Weeknd", "15.jpg", "15.mp3"),
            new Song(16, "Quedate", "3:19", "Music Sessions", "2023", "Pop", "Quevedo, Bizarrap", "16.jpg", "16.mp3"),
            new Song(17, "One Last Time", "3:18", "My Everything", "2015", "Pop", "Ariana Grande", "17.jpg", "17.mp3"),
            new Song(18, "Hasta la raiz", "3:40", "Single", "2015", "Alternativa", "Natalia Lafourcade", "18.jpg", "18.mp3"),
            new Song(19, "LaLa", "3:18", "El final del princio", "2023", "Urbano latino", "Myke Towers", "19.jpg", "19.mp3"),
            new Song(20, "Dark Horse", "3:45", "Prism", "2013", "Pop", "Katy Perry", "20.jpg", "20.mp3"),
            new Song(21, "Hello", "4:55", "25", "2015", "Soul", "Adele", "21.jpg", "21.mp3"),
            new Song(22, "I can't get enough", "2:38", "Single", "2019", "Electronica", "Benny Blanco, Selena Gomez", "22.jpg", "22.mp3"),
            new Song(23, "La cancion", "4:03", "Oasis", "2019", "Urbano latino", "Bad Bunny, J Balvin", "23.jpg", "23.mp3"),
            new Song(24, "Traitor", "3:58", "Sour", "2021", "Balada", "Olivia Rodrigo", "24.jpg", "24.mp3"),
            new Song(25, "Cheri Cheri Lady", "3:17", "Let's talk about love", "1985", "Pop", "Modern Talking", "25.jpg", "25.mp3"),
            new Song(26, "See you again", "3:47", "Most wante", "2015", "Pop", "Wiz Khalifa", "26.jpg", "26.mp3"),
            new Song(27, "Let her go", "4:15", "All the little lights", "2012", "Soft rock", "Passenger", "27.jpg", "27.mp3"),
            new Song(28, "Shape of you", "3:55", "÷", "2017", "Pop", "Ed Sheeran", "28.jpg", "28.mp3"),
            new Song(29, "Tuyo", "4:30", "Primer dia clases", "2021", "Urbano latino", "Mora", "29.jpg", "29.mp3"),
            new Song(30, "Tal vez", "4:24", "Homerun", "2019", "Urbano latino", "Paulo Londra", "30.jpeg", "30.mp3")
        ];
        //Inicializar variables;
        this.currentSong = this.catalogoCanciones[0];
        this.currentIndex = 0;
        this.currentPlaybackTime = undefined;
        this.currentPlaylist = 'busqueda';
        this.audio = new Audio();

        //Llamada a funciones
        this.mostrarCanciones(this.catalogoCanciones);
        this.filtrarCanciones();
        this.logout();
        this.limpiarFiltro();
        this.showCurrentSong();

        //Inicializar constructor de la clase Playlist
        this.busqueda = new PlayList({ nombre: "busqueda", canciones: this.catalogoCanciones, container: busqueda });
        this.mainPlaylist = new PlayList({ nombre: "playlist", container: playlist });
        this.favorites = new PlayList({ nombre: "favoritos", container: favoritos });
        this.renderList(this.mainPlaylist.canciones, this.mainPlaylist.container);
        this.renderList(this.favorites.canciones, this.favorites.container);

        //Llamada a la función play
        let playSong = document.getElementById("playSong");
        playSong.addEventListener('click', () => {
            this.playSong();
        });

        //Llamada a la función pause
        let pauseSong = document.getElementById("pauseSong");
        pauseSong.addEventListener('click', () => {
            this.pause();
        });

        //Llamada a la función stop
        let stopSong = document.getElementById("stopSong");
        stopSong.addEventListener('click', () => {
            this.stop();
        });

        //Llamada a la funcion next
        let nextSong = document.getElementById("nextSong");
        nextSong.addEventListener('click', () => {
            this.nextSong();
        });

        //Llamada a la funcion back
        let backSong = document.getElementById("backSong");
        backSong.addEventListener('click', () => {
            this.backSong();
        });

        //Llamada a la funcion mute
        let muteSong = document.getElementById("muteSong");
        muteSong.addEventListener('click', () => {
            if (this.audio.muted) {
                this.unmute(muteSong);
            } else {
                this.mute(muteSong);
            }
        });

        //Funcion que cambia automaticamente de cancion
        this.audio.addEventListener("ended", () => {
            this.playNextSong();
        });
    }

    mostrarCanciones = function (canciones) {
        const contenedorBusqueda = document.getElementById("busqueda");
        if (canciones.length === 0) return contenedorBusqueda.innerHTML = `<p id="noSongs">No se encontraron canciones</p>`;
        this.renderList(canciones, contenedorBusqueda);
    }

    filtrarCanciones = function () {
        const botonBuscar = document.getElementById("searchBoton");
        botonBuscar.addEventListener("click", () => {
            let inputBuscar = document.getElementById("searchInput").value.trim().toLowerCase();
            let filtroBusqueda = inputBuscar;
            let regex = new RegExp(filtroBusqueda, "i");
            let cancionesFiltradas = this.catalogoCanciones.filter(
                song => regex.test(song.nombre.toLowerCase())
                    || regex.test(song.genero.toLowerCase())
                    || regex.test(song.artista.toLowerCase())
            );
            this.mostrarCanciones(cancionesFiltradas);
        });
    }

    playSong = function () {
        let currentPlaylist;
        switch (this.currentPlaylist) {
            case "busqueda":
                currentPlaylist = this.busqueda;
                break;
            case "playlist":
                currentPlaylist = this.mainPlaylist;
                break;
            case "favoritos":
                currentPlaylist = this.favorites;
                break;
            default:
                console.error("ID de contenedor no válido");
                return;
        }
        const selectedSongIndex = currentPlaylist.canciones.findIndex(song => song.id === this.currentSong.id);
        currentPlaylist.currentSongIndex = selectedSongIndex;
        this.currentPlaylist = currentPlaylist.container.id;
        this.cambiarCancion();
    }

    pause = function () {
        if (!this.audio.paused && this.audio.currentTime > 0) {
            this.currentPlaybackTime = this.audio.currentTime;
            this.audio.pause();
        }
    }

    stop = function () {
        this.audio.currentTime = 0;
        this.audio.pause();
    }

    cambiarCancion = function () {
        const cover = document.getElementById("imgPortada");
        const infoCancion = document.getElementById("infoCancion");
        infoCancion.innerHTML = `<p> <strong>Nombre: </strong> ${this.currentSong.nombre}</p>
                                 <p> <strong>Duracion: </strong> ${this.currentSong.duracion}</p>
                                 <p> <strong>Albúm: </strong> ${this.currentSong.album}</p>
                                 <p> <strong>Año: </strong> ${this.currentSong.anio}</p>
                                 <p> <strong>Género: </strong> ${this.currentSong.genero}</p>
                                 <p> <strong>Artista: </strong> ${this.currentSong.artista}</p>`
        cover.src = "../assets/portadas/" + this.currentSong.portada;
        this.audio.pause();
        this.audio.src = "../assets/canciones/" + this.currentSong.url;
        if (this.currentPlaybackTime !== undefined) {
            this.audio.currentTime = this.currentPlaybackTime;
            delete this.currentPlaybackTime;
        }
        this.audio.play();
    }

    nextSong = function () {
        let currentPlaylist;
        switch (this.currentPlaylist) {
            case 'busqueda':
                currentPlaylist = this.busqueda;
                break;
            case 'playlist':
                currentPlaylist = this.mainPlaylist;
                break;
            case 'favoritos':
                currentPlaylist = this.favorites;
                break;
            default:
                console.error("Lista de reproducción no válida");
                return;
        }
        currentPlaylist.currentSongIndex = this.currentIndex;
        currentPlaylist.currentSongIndex += 1;

        if (currentPlaylist.currentSongIndex >= currentPlaylist.canciones.length) {
            currentPlaylist.currentSongIndex = 0;
        }

        const nextSong = currentPlaylist.canciones[currentPlaylist.currentSongIndex];
        this.currentIndex = currentPlaylist.currentSongIndex;
        this.currentSong = nextSong;
        this.currentPlaylist = currentPlaylist.container.id;
        this.cambiarCancion();
    }

    backSong = function () {
        let currentPlaylist;
        switch (this.currentPlaylist) {
            case 'busqueda':
                currentPlaylist = this.busqueda;
                break;
            case 'playlist':
                currentPlaylist = this.mainPlaylist;
                break;
            case 'favoritos':
                currentPlaylist = this.favorites;
                break;
            default:
                console.error("Lista de reproducción no válida");
                return;
        }
        currentPlaylist.currentSongIndex = this.currentIndex;
        currentPlaylist.currentSongIndex -= 1;
        if (currentPlaylist.currentSongIndex < 0) {
            currentPlaylist.currentSongIndex = currentPlaylist.canciones.length - 1;
        }
        const backSong = currentPlaylist.canciones[currentPlaylist.currentSongIndex];
        this.currentIndex = currentPlaylist.currentSongIndex;
        this.currentSong = backSong;
        this.currentPlaylist = currentPlaylist.container.id;
        this.cambiarCancion();
    }

    mute = function (muteSong) {
        this.audio.muted = true;
        muteSong.classList.remove('fa-volume-off');
        muteSong.classList.add('fa-volume-up');
    }

    unmute = function (muteSong) {
        this.audio.muted = false;
        muteSong.classList.remove('fa-volume-up');
        muteSong.classList.add('fa-volume-off');
    }

    showCurrentSong = function () {
        const cover = document.getElementById("imgPortada");
        const infoCancion = document.getElementById("infoCancion");
        infoCancion.innerHTML = `<p> <strong>Nombre: </strong> ${this.currentSong.nombre}</p>
                                 <p> <strong>Duracion: </strong> ${this.currentSong.duracion}</p>
                                 <p> <strong>Albúm: </strong> ${this.currentSong.album}</p>
                                 <p> <strong>Año: </strong> ${this.currentSong.anio}</p>
                                 <p> <strong>Género: </strong> ${this.currentSong.genero}</p>
                                 <p> <strong>Artista: </strong> ${this.currentSong.artista}</p>`
        cover.src = "../assets/portadas/" + this.currentSong.portada;
    }

    playNextSong = function () {
        let currentPlaylist;
        switch (this.currentPlaylist) {
            case 'busqueda':
                currentPlaylist = this.busqueda;
                break;
            case 'playlist':
                currentPlaylist = this.mainPlaylist;
                break;
            case 'favoritos':
                currentPlaylist = this.favorites;
                break;
            default:
                console.error("Lista de reproducción no válida");
                return;
        }
        currentPlaylist.currentSongIndex = this.currentIndex;
        if (currentPlaylist.currentSongIndex < currentPlaylist.canciones.length - 1) {
            currentPlaylist.currentSongIndex++;
        } else {
            currentPlaylist.currentSongIndex = 0;
        }
        const nextSong = currentPlaylist.canciones[currentPlaylist.currentSongIndex];
        this.currentIndex = currentPlaylist.currentSongIndex;
        this.currentSong = nextSong;
        this.currentPlaylist = currentPlaylist.container.id;
        this.cambiarCancionWithDelay(2000);
    }

    cambiarCancionWithDelay = function (delay) {
        setTimeout(() => {
            this.cambiarCancion();
        }, delay);
    }

    renderList = function (canciones, container) {
        let lista;
        if (canciones.length === 0) return container.innerHTML = `<p id="noSongs">No se han agregado canciones</p>`;
        container.innerHTML = "";
        canciones.forEach(song => {
            const cancionDiv = document.createElement('div');
            cancionDiv.classList.add('canciones');
            cancionDiv.innerHTML = `<p id="res_${song.id}" class="nombreCancion" title="${song.genero}">
            <span class="songName">${song.nombre}</span><br>
            <span class="artistName">${song.artista}</span></p>`;
            const iconosListaDiv = document.createElement('div');
            iconosListaDiv.classList.add('iconosLista');

            const playIcon = document.createElement('i');
            playIcon.classList.add('fas', 'fa-play');
            playIcon.addEventListener('click', () => {
                this.currentPlaylist = container.id;
                this.currentSong = song;
                switch (container.id) {
                    case "busqueda":
                        lista = this.busqueda;
                        break;
                    case "playlist":
                        lista = this.mainPlaylist;
                        break;
                    case "favoritos":
                        lista = this.favorites;
                        break;
                    default:
                        console.error("Lista de reproducción no válida");
                        return;
                }
                this.currentIndex = lista.canciones.findIndex(x => x.id == song.id);
                this.playSong();
            });
            const heartIcon = document.createElement('i');
            const plusIcon = document.createElement('i');
            if (container.id == "playlist") {
                heartIcon.classList.add('fas', 'fa-heart');
                heartIcon.addEventListener("click", () => {
                    if (song.isFavorite == false) {
                        song.isFavorite = true;
                        this.favorites.addSong(song);
                        this.renderList(this.favorites.canciones, this.favorites.container);
                    } else {
                        alert("La canción " + song.nombre + " ya fue añadida a la lista de " + favoritos.id);
                    }
                });
                plusIcon.classList.add('fas', 'fa-trash');
                plusIcon.addEventListener('click', () => {
                    song.isInPlaylist = false;
                    this.mainPlaylist.removeSong(song);
                    this.renderList(canciones, container);
                });
            } else if (container.id == "favoritos") {
                heartIcon.classList.add('far', 'fa-heart');
                heartIcon.addEventListener("click", () => {
                    song.isFavorite = false;
                    this.favorites.removeSong(song);
                    this.renderList(canciones, container);
                });
                plusIcon.classList.add('fas', 'fa-plus');
                plusIcon.addEventListener('click', () => {
                    if (!this.mainPlaylist.canciones.filter(x => x.id == song.id && x.isInPlaylist == true).length) {
                        song.isInPlaylist = true;
                        this.mainPlaylist.addSong(song);
                        this.renderList(this.mainPlaylist.canciones, this.mainPlaylist.container);
                    } else {
                        alert("La canción " + song.nombre + " ya fue añadida a la lista de " + playlist.id);
                    }

                });
            } else if (container.id == "busqueda") {
                heartIcon.classList.add('fas', 'fa-heart');
                heartIcon.addEventListener("click", () => {
                    if (song.isFavorite == false) {
                        song.isFavorite = true;
                        this.favorites.addSong(song);
                        this.renderList(this.favorites.canciones, this.favorites.container);
                    } else {
                        alert("La canción " + song.nombre + " ya fue añadida a la lista de " + favoritos.id);
                    }
                });
                plusIcon.classList.add('fas', 'fa-plus');
                plusIcon.addEventListener('click', () => {
                    if (song.isInPlaylist == false) {
                        song.isInPlaylist = true;
                        this.mainPlaylist.addSong(song);
                        this.renderList(this.mainPlaylist.canciones, this.mainPlaylist.container);
                    } else {
                        alert("La canción " + song.nombre + " ya fue añadida a la lista de " + playlist.id);
                    }
                });
            }
            iconosListaDiv.appendChild(playIcon);
            iconosListaDiv.appendChild(heartIcon);
            iconosListaDiv.appendChild(plusIcon);
            cancionDiv.appendChild(iconosListaDiv);
            container.appendChild(cancionDiv);
        });
    }

    logout = function () {
        const logout = document.getElementById("logOut");
        logout.addEventListener('click', () => {
            window.location.href = "login.html";
        });
    }

    limpiarFiltro = function () {
        const limpiar = document.getElementById("cleanFilter");
        let inputBuscar = document.getElementById("searchInput");
        limpiar.addEventListener("click", () => {
            inputBuscar.value = "";
            this.renderList(this.busqueda.canciones, this.busqueda.container);
        });
    }
}

let reproductor = new Reproductor();


