/* Studio Player: service worker minimo per installare l'app (computer e Android).
   Le pagine passano sempre dalla rete (così gli aggiornamenti arrivano subito);
   se manca internet apre l'ultima versione salvata. Audio e servizi cloud non passano di qui. */
const C='studio-shell-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','manifest.webmanifest','icon-192.png','icon-512.png'])).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.mode!=='navigate')return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put('./',cp))}return res}).catch(()=>caches.match('./')))});
