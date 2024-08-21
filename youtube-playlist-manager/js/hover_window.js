document.getElementById('close-hover-window').addEventListener('click', function () {
    document.getElementById('playlist-hover-window').style.display = 'none';
});

document.getElementById('add-to-playlist').addEventListener('click', function () {
    // Add selected videos to playlist logic here
});

document.getElementById('playlist-search').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const playlists = document.querySelectorAll('#category-list .playlist-item');
    playlists.forEach(function (playlist) {
        const name = playlist.textContent.toLowerCase();
        playlist.style.display = name.includes(query) ? '' : 'none';
    });
});

/*
function filterPlaylists() {
    const query = document.getElementById('playlist-search').value.toLowerCase();
    const playlists = document.querySelectorAll('#category-list .playlist-item');
    playlists.forEach(function (playlist) {
        const name = playlist.textContent.toLowerCase();
        playlist.style.display = name.includes(query) ? '' : 'none';
    });
}

document.getElementById('playlist-search').addEventListener('input', filterPlaylists);
*/