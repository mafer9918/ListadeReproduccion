
const botonBuscar = document.getElementById("searchBoton");
const inputBuscar = document.getElementById("searchInput");
const contendorBusqueda = document.getElementById("listaCanciones");
const iconPlaySong = document.getElementById("playSong");

let canciones = ["Cancion 1", "Cancion 2", "Cancion 3", "Las maanitas", "ojitos lindos", "calm down", "standing next to you"];

function actualizarListaCanciones(cancionesFiltradas) {
    contendorBusqueda.innerHTML = "";
    cancionesFiltradas.forEach(song => {
        const cancionDiv = document.createElement('div');
        cancionDiv.classList.add('canciones');
        cancionDiv.innerHTML = `<p class="nombreCancion">${song}</p>`;

        const iconosListaDiv = document.createElement('div');
        iconosListaDiv.classList.add('iconosLista');

        const playIcon = document.createElement('i');
        playIcon.classList.add('fas', 'fa-play');
        playIcon.addEventListener('click', function () {
            console.log('Reproducir canción:');
        });

        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fas', 'fa-heart');
        heartIcon.addEventListener("click", function () {
            console.log("Dar me gusta: " + song);
        });

        const plusIcon = document.createElement('i');
        plusIcon.classList.add('fas', 'fa-plus');
        plusIcon.addEventListener('click', () => {
            console.log('Agregar a playlist:', song);
        });

        iconosListaDiv.appendChild(playIcon);
        iconosListaDiv.appendChild(heartIcon);
        iconosListaDiv.appendChild(plusIcon);

        cancionDiv.appendChild(iconosListaDiv);
        contendorBusqueda.appendChild(cancionDiv);
    });
}

botonBuscar.addEventListener("click", function () {
    let filtroBusqueda = inputBuscar.value;
    let regex = new RegExp(filtroBusqueda, "i");
    let cancionesFiltradas = canciones.filter(
        song => regex.test(song)
    );
    console.log(" resultado de busqueda" + cancionesFiltradas);
    actualizarListaCanciones(cancionesFiltradas);
});

iconPlaySong.addEventListener('click', function () {
    console.log('Cancion reproducida');
});


actualizarListaCanciones(canciones);


