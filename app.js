// Check if the browser supports service workers and PWA features
if ('serviceWorker' in navigator) {
    // Register the service worker
    navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
        console.error('Service Worker registration failed:', error);
    });
}
