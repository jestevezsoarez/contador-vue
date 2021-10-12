const CACHE_NAME = "v1_cache_contador_app_vue";
const URLS_TO_CACHE = [
    "./",
    "./img/favicon.png",
    "./img/icon32.png",
    "./img/icon64.png",
    "./img/icon128.png",
    "./img/icon256.png",
    "./img/icon512.png",
    "./img/icon1024.png",
    "./js/main.js",
    "./js/mountApp.js",
    "https://unpkg.com/vue@next",
    "./css/style.css",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(URLS_TO_CACHE).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )            
    )
})

self.addEventListener("activate", e => {
    const CACHE_WHITE_LIST = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(
            CACHE_NAME => {
                return Promise.all(
                    CACHE_NAME.map(
                        CACHE_NAME => {
                            if(CACHE_WHITE_LIST.indexOf(CACHE_NAME) === -1) {
                                return caches.delete(CACHE_NAME);
                            }
                        }
                    )
                );
            })
        .then(
            () => self.clients.claim()
        )
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if(res) {
                    return res;
                }
                return fetch(e.request);                
            })
    );
});