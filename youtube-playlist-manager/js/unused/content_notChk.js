console.log('YouTube Playlist Manager: content.js is loaded.');

// ページが完全に読み込まれたら実行
window.addEventListener('load', function() {
    console.log('YouTube Playlist Manager: window.onload event is fired.');

    // <ytd-popup-container> 要素を取得
    const popupContainer = document.querySelector('ytd-popup-container');

    if (popupContainer) {
        // MutationObserverで監視
        const monitoringConfig = { childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = function(mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // 子要素に <tp-yt-paper-listbox class="ytd-menu-popup-renderer"> が追加されたかどうかをチェック
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE && node.matches('tp-yt-paper-listbox.ytd-menu-popup-renderer')) {
                            console.log('YouTube Playlist Manager: <tp-yt-paper-listbox class="ytd-menu-popup-renderer"> has been added.');

                            // 追加された要素をターゲットとしてボタンを追加する処理を行う
                            const targetNode = node;

                            // 新しいボタン要素を作成
                            const newButton = document.createElement('tp-yt-paper-item');
                            newButton.className = 'style-scope ytd-menu-service-item-renderer';
                            newButton.setAttribute('role', 'option');
                            newButton.setAttribute('tabindex', '0');
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
                                    });
                            });

                            // ボタンをtargetNodeの最後に追加
                            targetNode.appendChild(newButton);

                            // 必要であれば、observer.disconnect() で監視を停止できます
                        }
                    });
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the popupContainer for configured mutations
        observer.observe(popupContainer, monitoringConfig);
    } else {
        console.error('YouTube Playlist Manager: <ytd-popup-container> not found.');
    }
});
