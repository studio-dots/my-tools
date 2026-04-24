const CACHE_NAME = 'calc-v1'; //코드수정시 캐시 이름 버번번호를 변경하여 업데이트를 강제함
const ASSETS_TO_CACHE = [
    './',
    './index.html', // 파일명 실제이름을 맞춰주세요.
    './icon.png' //아이콘 경로
];

// 설치 단계: 필요한 파일을 캐시에 저장
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 요청 가로채기: 오프라인일 때 캐시된 파일 제공
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});