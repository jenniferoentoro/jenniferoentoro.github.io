
var deferredPrompt;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../sw.js')
    .then(function() {
      console.log('Service worker registered!');
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function(choiceResult) {
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === 'dismissed') {
        console.log('User cancelled installation');
      } else {
        console.log('User added to home screen');
      }
    });

    deferredPrompt = null;
  }
  return false;
});

document.addEventListener('DOMContentLoaded', function() {
  
});
