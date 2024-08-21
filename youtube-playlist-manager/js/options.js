document.getElementById('add-category').addEventListener('click', function () {
    const categoryName = document.getElementById('new-category-name').value;
    if (categoryName) {
        // Logic to add category and update UI
    }
});

document.getElementById('export-json').addEventListener('click', function () {
    // Logic to export categories and playlists to JSON
});

document.getElementById('import-json').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        // Logic to import categories and playlists from JSON
    }
});

document.getElementById('save-api-key').addEventListener('click', function () {
    const apiKey = document.getElementById('api-key').value;
    if (apiKey) {
        chrome.storage.local.set({ apiKey: apiKey });
        alert('API Key saved successfully!');
    }
});

