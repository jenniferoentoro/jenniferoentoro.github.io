var deferredPrompt;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
      console.log('Service worker registered!');
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt firedde');
  event.preventDefault();
  deferredPrompt = event;
  console.log(deferredPrompt);
  return false;
});
