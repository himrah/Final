"use strict";var precacheConfig=[["/static/bundles/index.html","53669e5e9241bac907f4ad8a4781227d"],["/static/bundles/static/css/main.55ce2797.css","72d83c63aa389b0fdf5e152738272487"],["/static/bundles/static/js/0.d02a3e9c.chunk.js","4dde160fc5afb4d4759f3572b4a26828"],["/static/bundles/static/js/1.a06539d3.chunk.js","c2ae490959379c37357d8505af3a241c"],["/static/bundles/static/js/2.96d44f24.chunk.js","5a5002e6c4ebbc1989e61d332ed9bb53"],["/static/bundles/static/js/3.4e76f2ca.chunk.js","03ca8ee7af35ece66552f963c7370a27"],["/static/bundles/static/js/4.73287c94.chunk.js","3259490799e835751e69ee2a16a84d38"],["/static/bundles/static/js/5.faa1ecd0.chunk.js","8fa24638f754fd6c715c31b01464a093"],["/static/bundles/static/js/6.548cc0f5.chunk.js","dfece0d524adb5125f63efd41a6c1519"],["/static/bundles/static/js/7.a7478409.chunk.js","a89c330633c533e31e7c46a908aa6f9a"],["/static/bundles/static/js/8.d4a26865.chunk.js","ee5da2c4db0dafb89bf261ff81dcf105"],["/static/bundles/static/js/9.48cee498.chunk.js","47dbdff20dc2ed4ca417c5e61bf64c37"],["/static/bundles/static/js/main.f20dd1da.js","cca3bfb12a5543b873f469d91d889894"],["/static/bundles/static/media/BLKCHCRY.753833d2.TTF","753833d2833e9f73b56cffae357cf95f"],["/static/bundles/static/media/ab.99f6fee0.png","99f6fee0ee04b856a143df789de223dd"],["/static/bundles/static/media/instagram.34ada163.png","34ada1638ef7bef370e593e45e2cd29a"],["/static/bundles/static/media/logo.5d5d9eef.svg","5d5d9eefa31e5e13a6610d9fa7a283bb"],["/static/bundles/static/media/logout.49498212.png","494982125f5775fa41c25e5786230e69"],["/static/bundles/static/media/notify.9017d0c0.png","9017d0c0f92f4cb5ab0ecb6a83475378"],["/static/bundles/static/media/profile.6d691fab.png","6d691fab3cb1aa2963a3e74c9cbb9b19"],["/static/bundles/static/media/trebuc.d866b4f2.ttf","d866b4f2ff8ff64c258d78f5069a195d"],["/static/bundles/static/media/twitter.3d74e8bf.png","3d74e8bfd4ef7985f7529bb9f7650eca"],["/static/bundles/static/media/user.b12a511b.png","b12a511b64057d271d6b213789cd4b68"],["/static/bundles/static/media/web.bdcf8050.png","bdcf8050e81ea60ff153b22fce408bdb"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var s=new URL(e);return n&&s.pathname.match(n)||(s.search+=(s.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),s.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),s=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),s]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var s="/static/bundles/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(s,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});