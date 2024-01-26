document.addEventListener('DOMContentLoaded', function() {
    const songsList = document.getElementById('songs-list');

    function fetchSongs() {
        fetch('https://api.j3.cx/last-song')
            .then(response => response.json())
            .then(songs => {
                updateSongsList(songs);
            })
            .catch(error => {
                console.error('Error fetching songs:', error);
                songsList.innerHTML = '<li>Failed to load songs.</li>';
            });
    }

    function updateSongsList(songs) {
        songsList.innerHTML = ''; // Clear the list before adding new items

        songs.forEach(song => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${song.url}" target="_blank" rel="noopener noreferrer">${song.name}</a> by ${song.artist}`;
            songsList.appendChild(listItem);
        });
    }

    fetchSongs();
});