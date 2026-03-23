self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('iv-cache').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/app.js',
                '/database.json'
            ]);
        })
    );
});