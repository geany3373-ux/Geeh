const CACHE = "fox-protege-v1";
const ASSETS = ["./", "./index.html", "./manifest.json"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener("activate", event => { event.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", event => { event.respondWith(caches.match(event.request).then(r => r || fetch(event.request).then(res => { const copy=res.clone(); caches.open(CACHE).then(c=>c.put(event.request,copy)); return res; }).catch(()=>caches.match("./index.html")))); });
