//console.log('YouTube Playlist Manager: content.js is loaded.');

const checkPopupContainer = (retryCount, delay) => {
    return new Promise((resolve, reject) => {
        let attempts = 0;

        const attemptCheck = () => {
            const popupContainer = document.querySelector('ytd-popup-container');
            if (popupContainer) {
                resolve(popupContainer);
            } else {
                attempts++;
                if (attempts < retryCount) {
                    setTimeout(attemptCheck, delay);
                } else {
                    reject(new Error('YouTube Playlist Manager: popupContainer is not found'));
                }
            }
        }
        attemptCheck();
    })
}

// ページが完全に読み込まれたら実行
window.addEventListener('load', function() {
    //console.log('YouTube Playlist Manager: window.onload event is fired.');
    
    // MutationObserverで監視
    const popupContainer = document.querySelector('ytd-popup-container');

    checkPopupContainer(5, 1000) // retry 5 times with 1 second interval
        .then(popupContainer => {
            console.log('YouTube Playlist Manager: popupContainer is found: ', popupContainer);

            const monitoringConfig = { childList: true, subtree:true };
            const observer = new MutationObserver(callback);
            observer.observe(popupContainer, monitoringConfig);
        })
        .catch(error => {
            console.error(error.message);
            console.error(error.stack);
        });
});

// Callback function to execute when mutations are observed
const callback = (mutationsList, observer) => {
    console.log('YouTube Playlist Manager: callback function is executed.');
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            //console.log('YouTube Playlist Manager: A child node has been added or removed.');
            
            mutation.addedNodes.forEach(node => {
                // tp-yt-paper-listbox.ytd-menu-popup-renderer が追加されたらボタンを追加
                const targetNode = document.querySelector('tp-yt-paper-listbox.ytd-menu-popup-renderer');
                if (node.nodeType === Node.ELEMENT_NODE && targetNode) {
                    //console.log('YouTube Playlist Manager: <tp-yt-paper-listbox class="ytd-menu-popup-renderer"> has been added.');

                    // 新しいボタン要素を作成
                    const newButton = document.createElement('ytd-menu-service-item-renderer');
                    newButton.className = 'style-scope ytd-menu-popup-renderer';
                    newButton.setAttribute('system-icons', '');
                    newButton.setAttribute('role', 'menuitem');
                    newButton.setAttribute('use-icons', '');
                    newButton.setAttribute('tabindex', '-1');
                    newButton.setAttribute('aria-selected', 'false');
                    newButton.style.cursor = 'pointer';

                    // ボタン内のアイコンを作成
                    const iconContainer = document.createElement('yt-icon');
                    iconContainer.className = 'style-scope ytd-menu-service-item-renderer';
                    const iconSpan = document.createElement('span');
                    iconSpan.className = 'yt-icon-shape yt-spec-icon-shape';
                    const iconSvg = document.createElement('div');
                    iconSvg.style = 'width: 100%; height: 100%; display: block; fill: currentcolor;';
                    iconSvg.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
                        </svg>
                    `;
                    iconSpan.appendChild(iconSvg);
                    iconContainer.appendChild(iconSpan);
                    newButton.appendChild(iconContainer);

                    // ボタンのテキストを追加
                    const buttonText = document.createElement('yt-formatted-string');
                    buttonText.className = 'style-scope ytd-menu-service-item-renderer';
                    buttonText.textContent = 'YouTube Playlist Manager';
                    newButton.appendChild(buttonText);

                    // ボタンをクリックしたときに拡張機能のページを開く
                    newButton.addEventListener('click', () => {
                        fetch(chrome.runtime.getURL('hover_window.html'))
                            .then(response => response.text())
                            .then(data => {
                                const hoverWindow = document.createElement('div');
                                hoverWindow.id = 'ytb-playlist-manager-hover-window';
                                hoverWindow.innerHTML = data;
                                hoverWindow.style.position = 'fixed';
                                hoverWindow.style.top = '50px';
                                hoverWindow.style.right = '50px';
                                hoverWindow.style.backgroundColor = 'white';
                                hoverWindow.style.border = '1px solid black';
                                hoverWindow.style.zIndex = '1000';
                                document.body.appendChild(hoverWindow);
                            })
                    });


                    // ボタンをtargetNodeの最後に追加
                    targetNode.appendChild(newButton);


                    const testNode = document.querySelector('div#actions.style-scope.ytd-reel-player-overlay-renderer');
                    try {
                        const testContent = document.createElement('div');
                        testNode.appendChild(testContent);
                        console.log('YouTube Playlist Manager: testContent has been added: ', testNode);
                    } catch (error) {
                        console.error('YouTube Playlist Manager: testContent has not been added: ', error);
                    }


                    // Disconnect the observer
                    observer.disconnect();


                } else {
                    console.log('YouTube Playlist Manager: A child node has not been added or removed.');
                }
            });
        }
    }
}


/*
// background.js でのメッセージリスナー
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'openExtensionPage') {
        chrome.tabs.create({ url: 'chrome-extension://' + chrome.runtime.id + '/options.html' });
    }
}
*/
