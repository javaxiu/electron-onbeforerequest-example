window.onload = () => {
  const div = document.createElement('div');
  div.innerHTML = '<webview id="webview" src="http://google.com/" style="width: 100vw; height: 100vh;"></webview>'
  document.body.appendChild(div);
  const webview = document.getElementById('webview')
  webview.addEventListener('dom-ready', () => {
    webview.getWebContents().session.webRequest.onBeforeRequest((details, callback) => {
      try {
        if (details.url.startsWith('https://ads.google.com/')) {
          callback({
            redirectURL: `about:blank`,
          });
          return;
        }
      } catch (e) {
      }
      callback({});
    });
    webview.addEventListener('did-navigate', (e) => {
      console.log(e.url);
    });
  })
}