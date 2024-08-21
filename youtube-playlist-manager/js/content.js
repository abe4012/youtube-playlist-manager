
// console.log('YouTube Playlist Manager: content.js is loaded.');

// get current URL
let currentUrl = window.location.href;

// retry settings
// delay 1000 -> 1 second
const retryCount = 5;
const delay = 1000;


const checkExistElement = (query, retryCount, delay) => {
    return new Promise((resolve, reject) => {
        let attempts = 0;

        const attemptCheck = () => {
            const element = document.querySelector(query);
            if (element) {
                resolve(element);
            } else if (attempts < retryCount) {
                setTimeout(attemptCheck, delay);
                attempts++;
            } else {
                reject(new Error(`YouTube Playlist Manager: ${query} is not found`));
            }
        }
        attemptCheck();
    })
}


const createButton = () => {
    const button = document.createElement('button');
    button.className = 'ytb-playlist-manager-button';
    button.textContent = 'YouTube Playlist Manager';
    button.style.cursor = 'pointer';

    button.addEventListener('click', () => {
        fetch(chrome.runtime.getURL('hover_window.html'))
            .then(response => response.text())
            .then(data => {
                const hoverWindow = document.createElement('div');
                hoverWindow.id = 'ytb-playlist-manager-hover-window';
                hoverWindow.innerHTML = data;
                hoverWindow.style.position = 'fixed';
                hoverWindow.style.top = '0vh';
                hoverWindow.style.left = '70vw';
                hoverWindow.style.backgroundColor = 'white';
                hoverWindow.style.border = '1px solid black';
                hoverWindow.style.zIndex = '5000';
                document.body.appendChild(hoverWindow);
            })
            .catch(error => {
                console.error('Failed to load hover_window.html:', error);
            });
    });

    return button;
    // observer.disconnect();
};


const removeExistingButton = () => {
    const existingButton = document.querySelector('button.ytb-playlist-manager-button');
    if (existingButton) {
        existingButton.remove();
    }
}


const addElement = () => {

    removeExistingButton();

    let querySelector = "";

    if(window.location.pathname.startsWith('/shorts')) {
        querySelector = '#actions.style-scope.ytd-reel-player-overlay-renderer';
    } else {
        querySelector = '#middle-row';
    }

    checkExistElement(querySelector, retryCount, delay)
        .then((element) => {
            // console.log('YouTube Playlist Manager: element is found: ', element);
            const button = createButton();
            // console.log("button: " + button)
            element.appendChild(button);
            // console.log("elemnt: " + element);

        })
        .catch((error) => {
            console.error(error);
            console.error(error.stack);
        });
}


const observer = new MutationObserver(() => {

    if (currentUrl !== window.location.href) {
        currentUrl = window.location.href;
        addElement();

    }
});


// ページが完全に読み込まれたら実行
window.addEventListener('load', function() {

    observer.observe(document.body, { childList: true, subtree: true });

    addElement();

});
