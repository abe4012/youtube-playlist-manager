function addToPlaylist(playlistId, videoId, apiKey) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${apiKey}`;
    const data = {
        snippet: {
            playlistId: playlistId,
            resourceId: {
                kind: 'youtube#video',
                videoId: videoId
            }
        }
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.error) {
            console.error('Error adding video to playlist:', result.error);
        } else {
            console.log('Video added to playlist:', result);
        }
    })
    .catch(error => {
        console.error('Error adding video to playlist:', error);
    });
}
