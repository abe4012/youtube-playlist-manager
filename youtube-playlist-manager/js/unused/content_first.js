document.addEventListener('DOMContentLoaded', function () {
    const icon = document.createElement('i');
    icon.className = 'fa fa-plus-circle youtube-playlist-manager-icon';
    icon.style.position = 'fixed';
    icon.style.bottom = '20px';
    icon.style.right = '20px';
    icon.style.fontSize = '30px';
    icon.style.color = '#ff0000';
    icon.style.cursor = 'pointer';
    document.body.appendChild(icon);

    icon.addEventListener('click', function () {
        if (!document.getElementById('playlist-hover-window')) {
            createHoverWindow();
        }
    });
});

function createHoverWindow() {
    const hoverWindow = document.createElement('div');
    hoverWindow.id = 'playlist-hover-window';
    hoverWindow.style.position = 'fixed';
    hoverWindow.style.right = '0';
    hoverWindow.style.top = '0';
    hoverWindow.style.width = '400px';
    hoverWindow.style.height = '100%';
    hoverWindow.style.backgroundColor = '#ffffff';
    hoverWindow.style.boxShadow = '-2px 0 5px rgba(0,0,0,0.5)';
    hoverWindow.style.zIndex = '9999';
    hoverWindow.innerHTML = '<!-- Hover window content goes here -->';
    document.body.appendChild(hoverWindow);
}
