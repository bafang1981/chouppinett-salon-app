// PWA Install Prompt Management
let deferredPrompt;
let installDismissed = localStorage.getItem('pwaInstallDismissed');

// Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('[PWA] beforeinstallprompt event fired');
  e.preventDefault();
  deferredPrompt = e;
  
  // Don't show if user has dismissed before
  if (!installDismissed) {
    setTimeout(() => {
      showInstallBanner();
    }, 3000); // Show after 3 seconds
  }
});

// For testing: Show install banner after page load
document.addEventListener('DOMContentLoaded', () => {
  // Force show for testing (remove this in production)
  setTimeout(() => {
    if (!installDismissed && !deferredPrompt) {
      console.log('[PWA] Showing test banner (no install prompt available)');
      const banner = document.getElementById('installBanner');
      if (banner) {
        banner.classList.add('show');
      }
    }
  }, 5000); // Show after 5 seconds for testing
});

// Show install banner
function showInstallBanner() {
  const banner = document.getElementById('installBanner');
  if (banner && !banner.classList.contains('show')) {
    banner.classList.add('show');
    console.log('[PWA] Install banner shown');
  }
}

// Handle install button click
document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) {
        console.log('[PWA] Install prompt not available');
        showToast('Installation is not available on this device', 'info');
        return;
      }
      
      console.log('[PWA] Showing install prompt');
      deferredPrompt.prompt();
      
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`[PWA] User response to install prompt: ${outcome}`);
      
      if (outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt');
        showToast('StrandPro installed successfully! 🎉', 'success');
        hideInstallBanner();
        localStorage.setItem('pwaInstalled', 'true');
      } else {
        console.log('[PWA] User dismissed the install prompt');
      }
      
      deferredPrompt = null;
    });
  }
});

// Dismiss install banner
function dismissInstall() {
  hideInstallBanner();
  localStorage.setItem('pwaInstallDismissed', 'true');
  console.log('[PWA] Install banner dismissed');
}

function hideInstallBanner() {
  const banner = document.getElementById('installBanner');
  if (banner) {
    banner.classList.remove('show');
  }
}

// Check if app is running in standalone mode
function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true;
}

// Show appropriate message based on installation status
document.addEventListener('DOMContentLoaded', () => {
  // Check if already installed
  if (localStorage.getItem('pwaInstalled') || isStandalone()) {
    console.log('[PWA] App is running in standalone mode or already installed');
    hideInstallBanner();
  }
  
  // Log PWA capabilities
  if ('serviceWorker' in navigator) {
    console.log('[PWA] Service Worker supported');
  }
  
  if ('beforeinstallprompt' in window) {
    console.log('[PWA] Install prompt supported');
  } else {
    console.log('[PWA] Install prompt not supported (likely iOS or desktop)');
  }
  
  if ('Notification' in window) {
    console.log('[PWA] Notifications supported');
  }
});

// Handle app installed event
window.addEventListener('appinstalled', () => {
  console.log('[PWA] App was installed');
  hideInstallBanner();
  localStorage.setItem('pwaInstalled', 'true');
  showToast('StrandPro installed successfully! 🎉', 'success');
});

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('[SW] Service Worker registered with scope:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('[SW] New service worker found');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[SW] New content available, refreshing');
              showToast('App updated! Refreshing...', 'info');
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          });
        });
      })
      .catch((error) => {
        console.error('[SW] Service Worker registration failed:', error);
      });
  });
}
