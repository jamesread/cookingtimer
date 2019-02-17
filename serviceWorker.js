function installer(event) {
	console.log("install")

	urlsToCache = [
		"/",
		"main.css",
		"main.js",
		"js/CookingPot.js",
		"js/FoodItem.js",
		"favicon.png"
	];

	let responder = function(cache) {
		return cache.addAll(urlsToCache);
	}

	event.waitUntil(
		caches.open("appCache").then(responder)
	);
}

function fetcher(event) {
	console.log("fetcher");
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) {
				console.log("cached!", event.request);
				return response;
			}

			return fetch(event.request).then(
				function(response) {
					if (!response || response.status !== 200 || response.type !== "basic") {
						return response;
					}

					var responseToCache = response.clone();

					caches.open("appCache")
					.then(function(cache) {
						cache.put(event.request, responseToCache);
					});

					return response;
				}
				)
		})
	);
}

function activator(event) {
	console.log("activate")

	event.waitUntil(
		caches.keys().then(function() {
			return caches.delete("appCache");
		}
	));
}

self.addEventListener("install", installer);
self.addEventListener("fetch", fetcher);
self.addEventListener("activate", activator);
