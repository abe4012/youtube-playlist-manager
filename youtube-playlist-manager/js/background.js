chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({ categories: [], playlists: [], apiKey: '' });
});

function saveCategory(category) {
    chrome.storage.local.get('categories', function (data) {
        const categories = data.categories || [];
        categories.push(category);
        chrome.storage.local.set({ categories: categories });
    });
}

function savePlaylist(playlist) {
    chrome.storage.local.get('playlists', function (data) {
        const playlists = data.playlists || [];
        playlists.push(playlist);
        chrome.storage.local.set({ playlists: playlists });
    });
}

function getCategories(callback) {
    chrome.storage.local.get('categories', function (data) {
        callback(data.categories || []);
    });
}

function getPlaylists(callback) {
    chrome.storage.local.get('playlists', function (data) {
        callback(data.playlists || []);
    });
}
