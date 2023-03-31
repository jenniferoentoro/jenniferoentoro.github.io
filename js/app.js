var deferredPrompt;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
      console.log('Service worker registered!');
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

window.addEventListener('load', () => {
  // If there is a deferredPrompt, show the install prompt
  if (deferredPrompt) {
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User installed the PWA');
      } else {
        console.log('User dismissed the PWA install prompt');
      }

      // Clear the deferredPrompt so it can be used again later
      deferredPrompt = null;
    });
  }
});