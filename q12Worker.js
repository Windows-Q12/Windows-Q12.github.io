if (self+"" != "[object ServiceWorkerGlobalScope]") throw new Error("who you think i am??")
console.log("im runnig!!")

self.addEventListener("fetch", function(e) {
	console.log(e)
})